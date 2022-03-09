import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   CreateDateColumn,
   UpdateDateColumn,
   JoinTable,
   ManyToMany,
} from 'typeorm'
import { role } from './role'

@Entity()
export class user extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 256, nullable: false })
   firstname: string

   @Column({ type: 'varchar', length: 256, nullable: false })
   lastname: string

   @Column({ type: 'int', nullable: false })
   age: number

   @Column({ type: 'varchar', length: 256, nullable: false })
   email: string

   @Column({ type: 'varchar', length: 256, nullable: false })
   password: string

   @ManyToMany(() => role, { cascade: true })
   @JoinTable()
   role: role[]

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
