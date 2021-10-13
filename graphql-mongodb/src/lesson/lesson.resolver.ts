import { LessonType } from './lesson.type';

import { Query, Resolver } from '@nestjs/graphql';

@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'adklsfjkadls9348',
      name: 'new name',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
