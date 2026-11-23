import { Seeder } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { User } from './user.entity'
import { Role } from './role.enum'

export default class UserSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(User)
        const users = repository.create([
            {
                username: 'superadmin',
                email: 'superadmin@vgmq.com',
                roles: [Role.User, Role.Admin, Role.SuperAdmin],
                password: 'yoyo',
                enabled: true,
            },
            {
                username: 'admin1',
                email: 'admin1@vgmq.com',
                roles: [Role.User, Role.Admin],
                password: 'yoyo',
                enabled: true,
            },
            {
                username: 'admin2',
                email: 'admin2@vgmq.com',
                roles: [Role.User, Role.Admin],
                password: 'yoyo',
                enabled: true,
            },
            {
                username: 'user1',
                email: 'user1@vgmq.com',
                roles: [Role.User],
                password: 'yoyo',
                enabled: true,
            },
            {
                username: 'user2',
                email: 'user2@vgmq.com',
                roles: [Role.User],
                password: 'yoyo',
                enabled: true,
            },
        ])
        users.forEach((user) => {
            user.hashPassword()
        })
        await repository.insert(users)
    }
}
