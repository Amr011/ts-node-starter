import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   CreateDateColumn,
   UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
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

   @Column('int', { default: 0 })
   tokenVersion: number

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
