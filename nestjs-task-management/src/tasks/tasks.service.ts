import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks = async (filterDto: GetTasksFilterDto): Promise<Task[]> => {
    return this.tasksRepository.getTasks(filterDto);
  };

  getTaskById = async (taskId: string): Promise<Task> => {
    let foundTask: Task | null = null;
    try {
      foundTask = await this.tasksRepository.findOne(taskId);
    } catch (error) {
      console.log(`here was the error..`);
    }

    if (!foundTask) {
      throw new NotFoundException(
        null,
        `Task with Id: '${taskId}' doesn't exist!!`,
      );
    }

    return foundTask;
  };

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  deleteTaskbyId = async (deletedTaskId: string) => {
    const deleteResult = await this.tasksRepository.delete({
      id: deletedTaskId,
    });

    this.taskExistanceChecker(deleteResult, deletedTaskId);

    return deleteResult.affected;
  };

  updateTaskStatusById = async (
    updatedTaskId: string,
    newStatus: TaskStatus,
  ) => {
    const updateResult = await this.tasksRepository.update(updatedTaskId, {
      status: newStatus,
    });

    this.taskExistanceChecker(updateResult, updatedTaskId);

    return updateResult.affected;
  };

  taskExistanceChecker = (
    result: DeleteResult | UpdateResult,
    taskId: string,
  ) => {
    if (
      result.affected !== undefined &&
      (result.affected === null || result.affected <= 0)
    ) {
      throw new NotFoundException(`Task with id: ${taskId} not found!!`);
    }
  };
}
