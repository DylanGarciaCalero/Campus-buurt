import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoriesRepository.findOneOrFail(id);
  }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const newCategory = this.categoriesRepository.create(createCategoryInput);
    return this.categoriesRepository.save(newCategory);
  }

  async updateCategory(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.categoriesRepository.findOneOrFail(id);
    this.categoriesRepository.merge(category, updateCategoryInput);
    return this.categoriesRepository.save(category);
  }

  async softRemoveCategory(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne(id);
    return this.categoriesRepository.softRemove(category);
  }
}
