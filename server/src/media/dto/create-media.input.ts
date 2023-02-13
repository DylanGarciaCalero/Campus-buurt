import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMediaInput {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  url: string;
}
