import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
  ) {}

  async findAll(): Promise<Media[]> {
    return await this.mediaRepository.find({
      relations: [
        'initiative',
        'initiative.organisation',
        'organisation',
        'campus',
      ],
    });
  }

  async findOne(id: number): Promise<Media> {
    return await this.mediaRepository.findOneOrFail(id);
  }

  async createMedia(createMediaInput: CreateMediaInput): Promise<Media> {
    const media = this.mediaRepository.create(createMediaInput);
    return await this.mediaRepository.save(media);
  }

  async deleteMedia(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOneOrFail(id);
    return await this.mediaRepository.remove(media);
  }

  async updateMedia(
    id: number,
    updateMediaInput: UpdateMediaInput,
  ): Promise<Media> {
    const media = await this.mediaRepository.findOneOrFail(id);
    this.mediaRepository.merge(media, updateMediaInput);
    return await this.mediaRepository.save(media);
  }
}
