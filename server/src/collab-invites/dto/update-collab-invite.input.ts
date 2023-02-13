import { CreateCollabInviteInput } from './create-collab-invite.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCollabInviteInput extends PartialType(
  CreateCollabInviteInput,
) {
  @Field(() => Int)
  id: number;
}
