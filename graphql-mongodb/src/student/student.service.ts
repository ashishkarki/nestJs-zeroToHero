import { StudentEntity } from './student.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepo: Repository<StudentEntity>,
  ) {}

  async createStudent({ firstName, lastName }: CreateStudentInput) {
    const nuStudent = this.studentRepo.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return await this.studentRepo.save(nuStudent);
  }

  async getStudentById(toFindId: string) {
    return await this.studentRepo.findOne({ id: toFindId });
  }

  async getStudents() {
    return await this.studentRepo.find();
  }
}
