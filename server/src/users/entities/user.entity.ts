import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { Organisation } from 'src/organisations/entities/organisation.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Role from '../role.enum';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  @Field()
  role: Role;

  @ManyToOne(() => Organisation, (organisation) => organisation.users)
  @Field(() => Organisation, { nullable: true })
  organisation?: Organisation;

  @Column({ nullable: true })
  @Field()
  organisationId?: number;

  @ManyToOne(() => Initiative, (initiative) => initiative.user)
  @Field(() => Initiative, { nullable: true })
  initiative?: Initiative;
}
