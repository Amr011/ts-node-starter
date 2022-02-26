import 'reflect-metadata'

import dotenv from 'dotenv'
dotenv.config()

import { createConnection } from 'typeorm'
import { __prod__ } from '../utils/production'

export default async function connectDatabase(): Promise<void> {
   await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Amr123',
      database: 'typeOrmFirstPG',
      entities: ['src/entity/**/*.[tj]s'],
      migrations: ['src/migration/**/*.[tj]s'],
      subscribers: ['src/subscriber/**/*.[tj]s'],
      cli: {
         entitiesDir: '../entity',
         migrationsDir: '../migration',
         subscribersDir: '../subscriber',
      },
      synchronize: true,
      dropSchema: !__prod__,
      logging: true,
   })
}
