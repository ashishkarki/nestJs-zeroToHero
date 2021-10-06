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

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  // // http://localhost:3000/tasks/<task-id>
  @Get('/:id')
  getTaskById(@Param('id') taskId: string): Promise<Task> {
    return this.tasksService.getTaskById(taskId);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
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
    //@Body('status') newStatus: TaskStatus,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.tasksService.updateTaskStatusById(
      updatedTaskId,
      updateTaskStatusDto.status,
    );
  }
}
