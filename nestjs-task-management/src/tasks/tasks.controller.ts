import { User } from './../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  // // http://localhost:3000/tasks/<task-id>
  @Get('/:id')
  getTaskById(
    @Param('id') taskId: string,
    @GetUser() taskOwnerUser: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(taskId, taskOwnerUser);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  // http://localhost:3000/tasks/<delete-task-id>
  @Delete('/:id')
  deleteTaskbyId(
    @Param('id') deletedTaskId: string,
    @GetUser() taskOwnerUser: User,
  ) {
    return this.tasksService.deleteTaskbyId(deletedTaskId, taskOwnerUser);
  }

  // http://localhost:3000/tasks/<task-id>/<what-field-is-updated>
  // http://localhost:3000/tasks/ryty45629f/status
  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') updatedTaskId: string,
    //@Body('status') newStatus: TaskStatus,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() taskOwnerUser: User,
  ) {
    return this.tasksService.updateTaskStatusById(
      updatedTaskId,
      updateTaskStatusDto.status,
      taskOwnerUser,
    );
  }
}
