import {
    Controller,
    Get,
    Param,
    Post,
    Delete,
    UseGuards,
    NotFoundException,
    HttpCode,
    Req,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../users/roles.guard'
import { Roles } from '../users/roles.decorator'
import { Role } from '../users/role.enum'
import { LobbyReport, ReportStatus } from '../lobbies/entities/lobby-report.entity'
import { LobbyMessage } from '../lobbies/entities/lobby-message.entity'
import { User } from '../users/user.entity'
import { Request } from 'express'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/reports')
export class ReportsController {
    constructor(
        @InjectRepository(LobbyReport) private lobbyReportRepository: Repository<LobbyReport>,
        @InjectRepository(LobbyMessage) private lobbyMessageRepository: Repository<LobbyMessage>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get('')
    async getAllReports(): Promise<LobbyReport[]> {
        return this.lobbyReportRepository.find({
            relations: ['reporter', 'reported', 'updatedBy'],
            order: { createdAt: 'DESC' },
        })
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get(':id/messages')
    async getReportMessages(@Param('id') id: number): Promise<LobbyMessage[]> {
        const report = await this.lobbyReportRepository.findOneBy({ id })
        if (!report) {
            throw new NotFoundException('Report not found')
        }

        return this.lobbyMessageRepository.find({
            where: { lobbyId: report.lobbyId },
            relations: ['user'],
            order: { createdAt: 'ASC' },
        })
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Delete(':id/deny')
    @HttpCode(204)
    async denyReport(@Param('id') id: number, @Req() request: Request): Promise<void> {
        const user = request.user as User
        const report = await this.lobbyReportRepository.findOneBy({ id })
        if (!report) {
            throw new NotFoundException('Report not found')
        }

        // Update the report instead of deleting
        report.status = ReportStatus.Denied
        report.updatedBy = user
        await this.lobbyReportRepository.save(report)

        // Check if there are other pending reports for this lobby before deleting messages
        const hasPendingReports =
            (await this.lobbyReportRepository.count({
                where: { lobbyId: report.lobbyId, status: ReportStatus.Pending },
            })) > 0

        if (!hasPendingReports) {
            await this.lobbyMessageRepository.delete({ lobbyId: report.lobbyId })
        }
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Post(':id/ban')
    @HttpCode(204)
    async banUser(@Param('id') id: number, @Req() request: Request): Promise<void> {
        const user = request.user as User
        const report = await this.lobbyReportRepository.findOne({
            where: { id },
            relations: ['reported'],
        })
        if (!report) {
            throw new NotFoundException('Report not found')
        }

        const userToBan = await this.userRepository.findOneBy({ id: report.reported.id })
        if (userToBan) {
            let canBan = false
            if (user.roles.includes(Role.SuperAdmin)) {
                canBan = !userToBan.roles.includes(Role.SuperAdmin)
            } else if (user.roles.includes(Role.Admin)) {
                canBan = !(
                    userToBan.roles.includes(Role.Admin) ||
                    userToBan.roles.includes(Role.SuperAdmin)
                )
            }

            if (canBan) {
                await this.userRepository.save({
                    ...userToBan,
                    enabled: false,
                    banReason: 'Banned from report in lobby ' + report.lobbyId,
                    bannedBy: user,
                    currentHashedRefreshToken: null,
                    confirmationToken: null,
                    resetPasswordToken: null,
                })
            }
        }

        report.status = ReportStatus.Banned
        report.updatedBy = user
        await this.lobbyReportRepository.save(report)

        // Check if there are other pending reports for this lobby before deleting messages
        const hasPendingReports =
            (await this.lobbyReportRepository.count({
                where: { lobbyId: report.lobbyId, status: ReportStatus.Pending },
            })) > 0

        if (!hasPendingReports) {
            await this.lobbyMessageRepository.delete({ lobbyId: report.lobbyId })
        }
    }
}
