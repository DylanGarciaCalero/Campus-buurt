import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Organisation } from 'src/organisations/entities/organisation.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Invitation {
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
  email: string;

  @ManyToOne(() => Organisation, (organisation) => organisation.invitations)
  @Field(() => Organisation, { nullable: true })
  organisation?: Organisation;

  @Column({ nullable: true })
  @Field()
  organisationId?: number;
}
