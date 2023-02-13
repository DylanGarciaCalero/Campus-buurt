import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Campus } from 'src/campus/entities/campus.entity';
import { Initiative } from 'src/initiatives/entities/initiative.entity';
import { Organisation } from 'src/organisations/entities/organisation.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Media {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  url: string;

  @ManyToOne(() => Initiative, (initiative) => initiative.media)
  @Field(() => Initiative)
  initiative: Initiative;

  @ManyToOne(() => Organisation, (organisation) => organisation.media)
  @Field(() => Organisation)
  organisation: Organisation;

  @ManyToOne(() => Campus, (campus) => campus.media)
  @Field(() => Campus)
  campus: Campus;
}
