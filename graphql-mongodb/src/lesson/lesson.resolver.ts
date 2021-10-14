import { StudentService } from './../student/student.service';
import { LessonEntity } from './lesson.entity';
import { StudentType } from './../student/student.type';
import { StudentsToLessonInput } from './students-to-lesson.inpu';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver((_of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonSrv: LessonService,
    private studentSrv: StudentService,
  ) {}

  @Query((_returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonSrv.getLesson(id);
  }

  @Query((_returns) => [LessonType])
  lessons() {
    return this.lessonSrv.getLessons();
  }

  @ResolveField()
  async students(@Parent() lesson: LessonEntity) {
    return this.studentSrv.getManyStudents(lesson.students);
  }

  @Mutation((_returns) => LessonType)
  createLesson(
    // @Args('name') name: string,
    // @Args('startDate') startDate: string,
    // @Args('endDate') endDate: string,
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonSrv.createLesson(createLessonInput);
  }

  @Mutation((_returns) => LessonType)
  assignStudentsToLesson(
    @Args('studentsToLessonInput')
    { lessonId, studentIds }: StudentsToLessonInput,
  ) {
    return this.lessonSrv.assignStudentsToLesson(lessonId, studentIds);
  }
}
