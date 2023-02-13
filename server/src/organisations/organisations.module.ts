import { Module } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { OrganisationsResolver } from './organisations.resolver';
import { Organisation } from './entities/organisation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Organisation])],
  providers: [OrganisationsResolver, OrganisationsService],
  exports: [OrganisationsService],
})
export class OrganisationsModule {}
