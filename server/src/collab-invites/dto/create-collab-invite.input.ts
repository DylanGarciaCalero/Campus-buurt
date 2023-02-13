import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCollabInviteInput {
  @Field(() => Int)
  campusId: number;

  @Field(() => Int)
  initiativeId: number;
}
