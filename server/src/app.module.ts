import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampusModule } from './campus/campus.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { InitiativesModule } from './initiatives/initiatives.module';
import { CategoriesModule } from './categories/categories.module';
import { MediaModule } from './media/media.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EducationalProgramsModule } from './educational-programs/educational-programs.module';
import { InvitationsModule } from './invitations/invitations.module';
import { CollabInvitesModule } from './collab-invites/collab-invites.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

dotenv.config();

const environment = `${(process.env.NODE_ENV || 'development').toLowerCase()}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), `.env.${environment}`),
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      playground: true,
      sortSchema: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: environment === 'development' ? true : false,
        ssl:
          environment === 'production' ? { rejectUnauthorized: false } : false,
      }),
    }),
    CampusModule,
    OrganisationsModule,
    InitiativesModule,
    CategoriesModule,
    MediaModule,
    UsersModule,
    AuthModule,
    EducationalProgramsModule,
    InvitationsModule,
    CollabInvitesModule,
  ],
})
export class AppModule {}
