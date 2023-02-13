import { Module } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { InitiativesResolver } from './initiatives.resolver';
import { CategoriesModule } from 'src/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Initiative } from './entities/initiative.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Initiative]), CategoriesModule],
  providers: [InitiativesResolver, InitiativesService],
  exports: [InitiativesService],
})
export class InitiativesModule {}
