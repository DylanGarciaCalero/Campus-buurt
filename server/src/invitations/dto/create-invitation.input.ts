import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInvitationInput {
  @Field()
  name: string;

  @Field()
  organisationId: number;

  @Field()
  type: string;

  @Field()
  email: string;
}
