import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEducationalProgramInput } from './dto/create-educational-program.input';
import { UpdateEducationalProgramInput } from './dto/update-educational-program.input';
import { EducationalProgram } from './entities/educational-program.entity';

@Injectable()
export class EducationalProgramsService {
  constructor(
    @InjectRepository(EducationalProgram)
    private readonly educationalProgramRepository: Repository<EducationalProgram>,
  ) {}

  async findAll(): Promise<EducationalProgram[]> {
    return await this.educationalProgramRepository.find({
      relations: ['campus'],
    });
  }

  async findOne(id: number): Promise<EducationalProgram> {
    return await this.educationalProgramRepository.findOneOrFail(id, {
      relations: ['campus'],
    });
  }

  async findOneById(id: number): Promise<EducationalProgram> {
    return await this.educationalProgramRepository.findOneOrFail(id, {
      relations: ['campus'],
    });
  }

  async create(
    createEducationalProgramInput: CreateEducationalProgramInput,
  ): Promise<EducationalProgram> {
    return await this.educationalProgramRepository.save(
      createEducationalProgramInput,
    );
  }

  async update(
    id: number,
    updateEducationalProgramInput: UpdateEducationalProgramInput,
  ): Promise<EducationalProgram> {
    const updatedEducationalProgram =
      await this.educationalProgramRepository.preload({
        id,
        ...updateEducationalProgramInput,
      });

    return this.educationalProgramRepository.save(updatedEducationalProgram);
  }

  async softRemoveProgram(id: number): Promise<EducationalProgram> {
    const program = await this.educationalProgramRepository.findOne(id);
    return this.educationalProgramRepository.softRemove(program);
  }
}
