import { existsSync } from 'fs'

import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import * as process from 'node:process'

let envPath

if (process.env.NODE_ENV) {
    const nodeEnvPath = `./.env.${process.env.NODE_ENV}`
    if (existsSync(nodeEnvPath)) {
        envPath = nodeEnvPath
    }
}

if (!envPath && existsSync('./.env.local')) {
    envPath = './.env.local'
}

if (!envPath) {
    envPath = './.env'
}

const env = dotenv.config({ path: envPath })
export const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: env.parsed?.DATABASE_HOST,
    // @ts-ignore
    port: env.parsed?.DATABASE_PORT,
    username: env.parsed?.DATABASE_USERNAME,
    password: env.parsed?.DATABASE_PASSWORD,
    database: env.parsed?.DATABASE_NAME,
    logging: false,
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/src/migration/**/*{.ts,.js}'],
    seeds: [__dirname + '/src/**/*.seeder{.ts,.js}'],
    factories: [__dirname + 'src/**/*.factory{.ts,.js}'],
}

export const dataSource = new DataSource(dataSourceOptions)
