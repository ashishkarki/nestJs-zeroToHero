import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];
  // getAllTasks = () => {
  //   return this.tasks;
  // };
  // getTaskByFilters = (filterDto: GetTasksFilterDto) => {
  //   const { status, searchStr } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (searchStr) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.toLocaleLowerCase().includes(searchStr) ||
  //         task.description.toLocaleLowerCase().includes(searchStr),
  //     );
  //   }
  //   return tasks;
  // };
  // getTaskById = (taskId: string) => {
  //   const foundTask = this.tasks.find((task) => task.id === taskId);
  //   if (!foundTask) {
  //     throw new NotFoundException(
  //       null,
  //       `Task with Id: '${taskId}' doesn't exist!!`,
  //     );
  //   }
  //   return foundTask;
  // };
  // createTask(createTaskDto: CreateTaskDto) {
  //   const newTask: Task = {
  //     id: uuid(),
  //     title: createTaskDto.title,
  //     description: createTaskDto.description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(newTask);
  //   return newTask;
  // }
  // deleteTaskbyId = (id: string) => {
  //   const taskIdx = this.tasks.findIndex((task) => task.id === id);
  //   this.checkTaskIndexValidity(id, taskIdx);
  //   const deletedTask = this.tasks.splice(taskIdx, 1);
  //   return deletedTask[0]; // we are only deleting one item
  // };
  // updateTaskStatusById = (id: string, newStatus: TaskStatus) => {
  //   const taskIdx = this.tasks.findIndex((task) => task.id === id);
  //   this.checkTaskIndexValidity(id, taskIdx);
  //   const updatedTask: Task = {
  //     ...this.tasks[taskIdx],
  //     status: newStatus,
  //   };
  //   this.tasks.splice(taskIdx, 1, updatedTask);
  //   return updatedTask;
  // };
  // checkTaskIndexValidity = (taskId: string, taskIdx: number) => {
  //   if (taskIdx < 0) {
  //     throw new NotFoundException(`Task with id: ${taskId} not found!!`);
  //   }
  // };
}
