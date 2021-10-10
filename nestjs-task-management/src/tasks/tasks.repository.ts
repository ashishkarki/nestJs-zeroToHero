import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from './../auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository', { timestamp: true });

  async createTask(
    createTaskDto: CreateTaskDto,
    taskOwnerUser: User,
  ): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user: taskOwnerUser,
    });

    return await this.save(newTask);
  }

  async getTasks(filterDto: GetTasksFilterDto, tasksOwnerUser: User) {
    const { status, searchStr } = filterDto;

    const query = this.createQueryBuilder('task').where({
      user: tasksOwnerUser, // this 'user' name has to match the property name in task.entity.ts
    });

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }
    if (searchStr) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:searchStr) OR LOWER(task.description) LIKE LOWER(:searchStr))',
        { searchStr: `%${searchStr}%` },
      );
    }

    try {
      const tasks: Task[] = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Couldn't get tasks for user: ${tasksOwnerUser.username}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
