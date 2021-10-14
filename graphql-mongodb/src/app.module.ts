import { StudentEntity } from './student/student.entity';
import { LessonEntity } from './lesson/lesson.entity';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [LessonEntity, StudentEntity],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    LessonModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
