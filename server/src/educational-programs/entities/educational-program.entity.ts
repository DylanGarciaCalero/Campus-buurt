import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Campus } from 'src/campus/entities/campus.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class EducationalProgram {
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
  @Field(() => Int)
  credits: number;

  @Column()
  @Field()
  programType: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Campus, (campus) => campus.educationalPrograms)
  @Field(() => Campus, { nullable: true })
  campus?: Campus;

  @Column()
  @Field(() => Int, { nullable: true })
  campusId?: number;
}
