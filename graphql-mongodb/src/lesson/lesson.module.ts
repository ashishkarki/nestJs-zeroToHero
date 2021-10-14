import { StudentModule } from './../student/student.module';
import { LessonEntity } from './lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonResolver } from './lesson.resolver';
import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), StudentModule],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
