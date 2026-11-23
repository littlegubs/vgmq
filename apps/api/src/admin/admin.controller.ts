import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Put,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Repository } from 'typeorm'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Role } from '../users/role.enum'
import { Roles } from '../users/roles.decorator'
import { RolesGuard } from '../users/roles.guard'
import { User } from '../users/user.entity'
import { AdminBanDto } from './dto/admin-ban.dto'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/users')
export class AdminController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get('')
    async getAllUsers(
        @Query('page') page: string = '0',
        @Query('limit') limit: string = '25',
        @Query('search') search?: string,
        @Query('sort') sort?: string,
        @Query('order') order: 'ASC' | 'DESC' = 'DESC',
    ): Promise<{ items: User[]; total: number }> {
        const query = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.bannedBy', 'bannedBy')
            .select([
                'bannedBy.username',
                'user.id',
                'user.username',
                'user.enabled',
                'user.banReason',
                'user.createdAt',
            ])

        if (search) {
            query.where('user.username LIKE :search', { search: `%${search}%` })
        }

        if (sort) {
            query.orderBy(`user.${sort}`, order)
        } else {
            query.orderBy('user.createdAt', 'DESC')
        }

        const [items, total] = await query
            .skip(Number(page) * Number(limit))
            .take(Number(limit))
            .getManyAndCount()

        return { items, total }
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Get('/stats')
    async getUserStats(): Promise<{ date: string; count: number }[]> {
        const stats = await this.userRepository
            .createQueryBuilder('user')
            .select('DATE(user.createdAt)', 'date')
            .addSelect('COUNT(*)', 'count')
            .where('user.enabled = :enabled', { enabled: true })
            .groupBy('DATE(user.createdAt)')
            .orderBy('date', 'ASC')
            .getRawMany()

        let cumulative = 0
        return stats.map((row) => {
            cumulative += Number(row.count)
            return {
                date: new Date(row.date).toISOString(),
                count: cumulative,
            }
        })
    }

    @Roles(Role.Admin, Role.SuperAdmin)
    @Put('/ban/:id')
    @HttpCode(204)
    async banUser(
        @Req() request: Request,
        @Param('id') id: number,
        @Body() adminBanDto: AdminBanDto,
    ): Promise<void> {
        const user = request.user as User
        const userToBan = await this.userRepository.findOneBy({ id: id })
        let canBan = false
        if (!userToBan) {
            throw new NotFoundException()
        }

        if (user.roles.includes(Role.SuperAdmin)) {
            canBan = !userToBan.roles.includes(Role.SuperAdmin)
        } else if (user.roles.includes(Role.Admin)) {
            canBan = !(
                userToBan.roles.includes(Role.Admin) || userToBan.roles.includes(Role.SuperAdmin)
            )
        }

        if (!canBan) {
            throw new ForbiddenException()
        }

        await this.userRepository.save({
            ...userToBan,
            enabled: false,
            banReason: adminBanDto.banReason,
            bannedBy: user,
            currentHashedRefreshToken: null,
            confirmationToken: null,
            resetPasswordToken: null,
        })
    }
}
