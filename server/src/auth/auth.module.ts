import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './guards/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { OrganisationsModule } from 'src/organisations/organisations.module';
import { CampusModule } from 'src/campus/campus.module';

@Module({
  imports: [
    CampusModule,
    PassportModule,
    OrganisationsModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '3h' },
      secret: 'secret',
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AuthModule {}
