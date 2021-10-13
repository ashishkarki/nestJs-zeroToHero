import { LessonEntity } from './lesson.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepo: Repository<LessonEntity>,
  ) {}

  async createLesson(name: string, startDate: string, endDate: string) {
    const nuLesson = this.lessonRepo.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    return await this.lessonRepo.save(nuLesson);
  }

  async getLesson(toFindId: string) {
    return await this.lessonRepo.findOne({ id: toFindId });
  }
}
