import { CreateOrganisationInput } from './create-organisation.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrganisationInput extends PartialType(
  CreateOrganisationInput,
) {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  website: string;
}
