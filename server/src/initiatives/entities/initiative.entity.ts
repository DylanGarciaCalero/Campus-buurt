import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Campus } from 'src/campus/entities/campus.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CollabInvite } from 'src/collab-invites/entities/collab-invite.entity';
import { Media } from 'src/media/entities/media.entity';
import { Organisation } from 'src/organisations/entities/organisation.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Initiative {
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
  date: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  accepted: boolean;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Category, (category) => category.initiatives)
  @Field(() => Category, { nullable: true })
  category?: Category;

  @Column({ nullable: true })
  @Field()
  categoryId?: number;

  @ManyToOne(() => Organisation, (organisation) => organisation.initiatives)
  @Field(() => Organisation, { nullable: true })
  organisation?: Organisation;

  @Column({ nullable: true })
  @Field(() => Int)
  organisationId?: number;

  @OneToMany(() => Media, (media) => media.initiative)
  @Field(() => [Media])
  media: Media[];

  @OneToMany(() => User, (user) => user.initiative)
  @Field(() => [User])
  user: User[];

  @OneToMany(() => CollabInvite, (collabInvite) => collabInvite.initiative)
  @Field(() => [CollabInvite], { nullable: true })
  collabInvites?: CollabInvite[];

  @ManyToMany(() => Campus, (campus) => campus.initiatives)
  @Field(() => [Campus], { nullable: true })
  campuses: Campus[];
}
