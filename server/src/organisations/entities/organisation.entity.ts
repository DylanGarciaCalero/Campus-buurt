import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { Invitation } from 'src/invitations/entities/invitation.entity';
import { Media } from 'src/media/entities/media.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Role from '../../users/role.enum';

@Entity()
@ObjectType()
export class Organisation {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column('decimal', { precision: 8, scale: 6 })
  @Field(() => Float, { nullable: true })
  longitude: number;

  @Column('decimal', { precision: 8, scale: 6 })
  @Field(() => Float, { nullable: true })
  latitude: number;

  @Column()
  @Field()
  phone: string;

  @Column({ nullable: true })
  @Field()
  website: string;

  @Column({ nullable: true })
  @Field()
  instagram: string;

  @Column({ nullable: true })
  @Field()
  facebook: string;

  @Column({ nullable: true })
  @Field()
  twitter: string;

  @Column({ nullable: true })
  @Field()
  youtube: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Organisation,
  })
  @Field()
  role: string;

  @Column({ nullable: true })
  @Field()
  logo?: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Invitation, (invitation) => invitation.organisation)
  @Field(() => [Invitation], { nullable: true })
  invitations?: Invitation[];

  @OneToMany(() => Initiative, (initiative) => initiative.organisation)
  @Field(() => [Initiative], { nullable: true })
  initiatives?: Initiative[];

  @OneToMany(() => Media, (media) => media.organisation)
  @Field(() => [Media], { nullable: true })
  media?: Media[];

  @OneToMany(() => User, (user) => user.organisation)
  @Field(() => [User], { nullable: true })
  users: User[];
}
