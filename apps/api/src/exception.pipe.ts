import { BadRequestException, ValidationPipe } from '@nestjs/common'

export const exceptionPipe = new ValidationPipe({
    exceptionFactory: (errors): BadRequestException => {
        return new BadRequestException(
            errors.map((error) => {
                return {
                    property: error.property,
                    errors: Object.values(error.constraints ?? []),
                }
            }),
        )
    },
})
