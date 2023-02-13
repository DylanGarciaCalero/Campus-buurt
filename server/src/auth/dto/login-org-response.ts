import { Field, ObjectType } from '@nestjs/graphql';
import { Organisation } from 'src/organisations/entities/organisation.entity';

@ObjectType()
export class LoginOrgResponse {
  @Field()
  access_token: string;

  @Field(() => Organisation)
  organisation: Organisation;
}
