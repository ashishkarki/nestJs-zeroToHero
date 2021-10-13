import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonSrv: LessonService) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    // return {
    //   id: 'adklsfjkadls9348',
    //   name: 'new name',
    //   startDate: new Date().toISOString(),
    //   endDate: new Date().toISOString(),
    // };
    return this.lessonSrv.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ) {
    return this.lessonSrv.createLesson(name, startDate, endDate);
  }
}
