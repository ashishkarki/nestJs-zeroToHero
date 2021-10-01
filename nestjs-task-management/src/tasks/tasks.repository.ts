import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.save(newTask);
  }

  async getTasks(filterDto: GetTasksFilterDto) {
    const { status, searchStr } = filterDto;

    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }
    if (searchStr) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:searchStr) OR LOWER(task.description) LIKE LOWER(:searchStr)',
        { searchStr: `%${searchStr}%` },
      );
    }

    const tasks: Task[] = await query.getMany();

    return tasks;
  }
}
