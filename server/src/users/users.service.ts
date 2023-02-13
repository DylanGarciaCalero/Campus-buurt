import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['initiative', 'organisation'],
    });
  }

  async findAllAdmins(): Promise<User[]> {
    return await this.usersRepository.find({
      where: {
        role: 'Admin',
      },
      relations: ['initiative', 'organisation'],
    });
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne(
      { email },
      {
        relations: ['initiative', 'organisation'],
      },
    );
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOneOrFail(id, {
      relations: ['initiative', 'organisation'],
    });
  }

  async create(createUserInput: CreateUserInput) {
    const user = this.usersRepository.create(createUserInput);
    return await this.usersRepository.save(user);
  }

  async updateUser(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const updatedUser = await this.usersRepository.preload({
      id: id,
      ...updateUserInput,
    });

    return this.usersRepository.save(updatedUser);
  }

  async softRemoveUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    return this.usersRepository.softRemove(user);
  }
}
