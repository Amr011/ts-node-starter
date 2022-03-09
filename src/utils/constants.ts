import { IdbConfig } from '../types/IdbConfig'
import dotenv from 'dotenv'
dotenv.config()

export const dbConfig: IdbConfig = {
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'Amr123',
   database: 'typeOrmFirstPG',
}

export const __prod__ = process.env.NODE_ENV === 'production'
