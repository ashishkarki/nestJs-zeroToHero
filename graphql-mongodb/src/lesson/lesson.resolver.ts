import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver((_of) => LessonType)
export class LessonResolver {
  constructor(private lessonSrv: LessonService) {}

  @Query((_returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonSrv.getLesson(id);
  }

  @Query((_returns) => [LessonType])
  lessons() {
    return this.lessonSrv.getLessons();
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
}
