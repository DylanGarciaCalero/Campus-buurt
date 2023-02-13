import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { EducationalProgram } from 'src/educational-programs/entities/educational-program.entity';
import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { Media } from 'src/media/entities/media.entity';
import Role from '../../users/role.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CollabInvite } from 'src/collab-invites/entities/collab-invite.entity';

@Entity()
@ObjectType()
export class Campus {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  address?: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  phone?: string;

  @Column('decimal', { precision: 8, scale: 6 })
  @Field(() => Float, { nullable: true })
  longitude: number;

  @Column('decimal', { precision: 8, scale: 6 })
  @Field(() => Float, { nullable: true })
  latitude: number;

  @Column()
  @Field()
  email?: string;

  @Column()
  @Field()
  website?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Campus,
  })
  @Field()
  role: string;

  @Column()
  @Field()
  description?: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Media, (media) => media.campus)
  @Field(() => [Media], { nullable: true })
  media?: Media[];

  @OneToMany(() => CollabInvite, (collabInvite) => collabInvite.campus)
  @Field(() => [CollabInvite], { nullable: true })
  collabInvites?: CollabInvite[];

  @OneToMany(
    () => EducationalProgram,
    (educationalProgram) => educationalProgram.campus,
  )
  @Field(() => [EducationalProgram])
  educationalPrograms: EducationalProgram[];

  @ManyToMany(() => Initiative, (initiative) => initiative.campuses, {
    cascade: true,
  })
  @Field(() => [Initiative], { nullable: true })
  @JoinTable({
    name: 'campus_initiative',
    joinColumn: {
      name: 'campus_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'initiative_id',
      referencedColumnName: 'id',
    },
  })
  initiatives: Initiative[];
}
