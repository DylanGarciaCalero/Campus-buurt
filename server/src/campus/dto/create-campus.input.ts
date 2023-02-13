import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCampusInput {
  @Field()
  name: string;

  @Field()
  address?: string;

  @Field()
  phone?: string;

  @Field()
  email?: string;

  @Field()
  website?: string;

  @Field()
  description?: string;

  @Field()
  password: string;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Float, { nullable: true })
  latitude?: number;
}
