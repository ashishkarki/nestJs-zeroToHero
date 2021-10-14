import { CreateLessonInput } from './lesson.input';
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

  async createLesson(createLessonInput: CreateLessonInput) {
    const { name, startDate, endDate, students } = createLessonInput;

    const nuLesson = this.lessonRepo.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return await this.lessonRepo.save(nuLesson);
  }

  async getLesson(toFindId: string) {
    return await this.lessonRepo.findOne({ id: toFindId });
  }

  async getLessons() {
    return await this.lessonRepo.find({});
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<LessonEntity> {
    const lesson = await this.lessonRepo.findOne({ id: lessonId });

    lesson.students = [...lesson.students, ...studentIds];

    return this.lessonRepo.save(lesson);
  }
}
