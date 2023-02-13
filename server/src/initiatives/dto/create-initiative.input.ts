import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateInitiativeInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  date: Date;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  accepted?: boolean;

  @IsOptional()
  @Field({ nullable: true })
  categoryId?: number;

  @IsOptional()
  @Field({ nullable: true })
  organisationId?: number;

  @IsOptional()
  @Field({ nullable: true })
  campusId?: number;
}
