import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Campus } from 'src/campus/entities/campus.entity';
import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class CollabInvite {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Initiative, (initiative) => initiative.collabInvites)
  @Field(() => Initiative, { nullable: true })
  initiative?: Initiative;

  @Column({ nullable: true })
  @Field(() => Int)
  initiativeId?: number;

  @ManyToOne(() => Campus, (campus) => campus.collabInvites)
  @Field(() => Campus, { nullable: true })
  campus?: Campus;

  @Column({ nullable: true })
  @Field(() => Int)
  campusId?: number;
}
