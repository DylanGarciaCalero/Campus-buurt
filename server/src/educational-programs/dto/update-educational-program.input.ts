import { CreateEducationalProgramInput } from './create-educational-program.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEducationalProgramInput extends PartialType(
  CreateEducationalProgramInput,
) {
  @Field(() => Int)
  id: number;
}
