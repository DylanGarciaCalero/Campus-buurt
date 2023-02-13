import { Module } from '@nestjs/common';
import { EducationalProgramsService } from './educational-programs.service';
import { EducationalProgramsResolver } from './educational-programs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalProgram } from './entities/educational-program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EducationalProgram])],
  providers: [EducationalProgramsResolver, EducationalProgramsService],
})
export class EducationalProgramsModule {}
