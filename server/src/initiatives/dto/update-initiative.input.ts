import { CreateInitiativeInput } from './create-initiative.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateInitiativeInput extends PartialType(CreateInitiativeInput) {
  @Field(() => Int)
  id: number;
}
