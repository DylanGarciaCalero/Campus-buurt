import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import Role from '../role.enum';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @Field()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;

  @IsOptional()
  @Field({ nullable: true })
  organisationId?: number;

  @IsOptional()
  @Field({ nullable: true })
  role?: Role;
}
