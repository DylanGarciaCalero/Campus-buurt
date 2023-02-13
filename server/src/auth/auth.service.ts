import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { OrganisationsService } from 'src/organisations/organisations.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { CreateOrganisationInput } from 'src/organisations/dto/create-organisation.input';
import { CampusService } from 'src/campus/campus.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private organisationsService: OrganisationsService,
    private campusService: CampusService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user =
      (await this.usersService.findOne(email)) ||
      (await this.organisationsService.findOne(email)) ||
      (await this.campusService.findOneByEmail(email));
    const valid = user && (await bcrypt.compare(password, user?.password));

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateOrg(email: string, password: string): Promise<any> {
    const org = await this.organisationsService.findOne(email);
    const valid = org && (await bcrypt.compare(password, org?.password));

    if (org && valid) {
      const { password, ...result } = org;
      return result;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user =
      (await this.usersService.findOne(loginUserInput.email)) ||
      (await this.organisationsService.findOne(loginUserInput.email)) ||
      (await this.campusService.findOneByEmail(loginUserInput.email));
    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
        role: user.role,
      }),
      user: result,
    };
  }

  async signup(signupUserInput: CreateUserInput) {
    const user = await this.usersService.findOne(signupUserInput.email);

    if (user) {
      throw new Error('User already exists');
    }

    const password = await bcrypt.hash(signupUserInput.password, 10);

    return this.usersService.create({
      ...signupUserInput,
      password,
    });
  }

  async signupOrg(signupOrgInput: CreateOrganisationInput) {
    const org = await this.organisationsService.findOne(signupOrgInput.email);
    if (org) {
      throw new Error('User already exists');
    }
    const password = await bcrypt.hash(signupOrgInput.password, 10);
    return this.organisationsService.create({
      ...signupOrgInput,
      password,
    });
  }
}
