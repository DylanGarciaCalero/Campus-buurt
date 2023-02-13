import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEducationalProgramInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  credits: number;

  @Field()
  programType: string;

  @Field(() => Int)
  campusId: number;
}
