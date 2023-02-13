import { CreateCampusInput } from './create-campus.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCampusInput extends PartialType(CreateCampusInput) {
  @Field()
  name: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;
}
