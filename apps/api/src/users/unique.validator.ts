import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'
import { Repository } from 'typeorm'

import { User } from './user.entity'

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        const { property } = args
        return this.userRepository
            .findOneOrFail({
                where: {
                    [property]: value,
                },
            })
            .then(() => false)
            .catch(() => true)
    }

    defaultMessage(args: ValidationArguments): string {
        const { property } = args
        return `${property} already exists`
    }
}
