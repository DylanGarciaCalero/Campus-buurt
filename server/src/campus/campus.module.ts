import { Module } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CampusResolver } from './campus.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campus } from './entities/campus.entity';
import { InitiativesModule } from 'src/initiatives/initiatives.module';

@Module({
  imports: [TypeOrmModule.forFeature([Campus]), InitiativesModule],
  providers: [CampusResolver, CampusService],
  exports: [CampusService],
})
export class CampusModule {}
