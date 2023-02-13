import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateOrganisationInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  address: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  instagram: string;

  @Field({ nullable: true })
  facebook: string;

  @Field({ nullable: true })
  twitter: string;

  @Field({ nullable: true })
  youtube: string;

  @Field()
  website: string;

  @Field()
  password: string;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  logo?: string;
}
