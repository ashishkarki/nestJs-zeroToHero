import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './../task.model';

export class GetTasksFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  searchStr?: string;
}
