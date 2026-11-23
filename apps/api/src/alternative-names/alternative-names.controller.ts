import { Controller, Param, Patch, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { AlternativeName } from '../games/entity/alternative-name.entity'
import { Role } from '../users/role.enum'
import { Roles } from '../users/roles.decorator'
import { RolesGuard } from '../users/roles.guard'
import { AlternativeNamesService } from './alternative-names.service'

@Controller('alternative-names')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlternativeNamesController {
    constructor(private alternativeNamesService: AlternativeNamesService) {}

    @Roles(Role.Admin, Role.SuperAdmin)
    @Patch('/:id/toggle')
    async toggle(@Param('id') id: number): Promise<AlternativeName> {
        return this.alternativeNamesService.toggle(id)
    }
}
