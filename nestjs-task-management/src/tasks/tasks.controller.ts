import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  // http://localhost:3000/tasks/<task-id>
  @Get('/:id')
  getTaskById(@Param('id') taskId: string) {
    return this.tasksService.getTaskById(taskId);
  }

  @Post()
  createTask(
    //   @Body() body

    // @Body('title') title: string,
    // @Body('description') desc: string,

    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(createTaskDto);
  }

  // http://localhost:3000/tasks/<delete-task-id>
  @Delete('/:id')
  deleteTaskbyId(@Param('id') deletedTaskId: string) {
    return this.tasksService.deleteTaskbyId(deletedTaskId);
  }

  // http://localhost:3000/tasks/<task-id>/<what-field-is-updated>
  // http://localhost:3000/tasks/ryty45629f/status
  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') updatedTaskId: string,
    @Body('status') newStatus: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatusById(updatedTaskId, newStatus);
  }
}
