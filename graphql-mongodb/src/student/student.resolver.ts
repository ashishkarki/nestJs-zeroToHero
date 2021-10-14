import { CreateStudentInput } from './create-student.input';
import { StudentType } from './student.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';

@Resolver((_of) => StudentType)
export class StudentResolver {
  constructor(private studentSrv: StudentService) {}

  @Query((_returns) => StudentType)
  student(@Args('id') id: string) {
    return this.studentSrv.getStudentById(id);
  }

  @Query((_returns) => [StudentType])
  async students() {
    return await this.studentSrv.getStudents();
  }

  @Mutation((_returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentSrv.createStudent(createStudentInput);
  }
}
