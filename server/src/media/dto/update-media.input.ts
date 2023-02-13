import { CreateMediaInput } from './create-media.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMediaInput extends PartialType(CreateMediaInput) {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  url: string;
}
