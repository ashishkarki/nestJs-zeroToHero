import { StudentResolver } from './student.resolver';
import { StudentEntity } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
