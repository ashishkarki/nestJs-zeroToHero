import { TaskStatus } from './task-status.enum';
import { Task } from './../../dist/tasks/task.model.d';
import { NotFoundException } from '@nestjs/common';
import { User } from './../auth/user.entity';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { Test } from '@nestjs/testing';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: any;

  const mockID = 'Mock ID';

  const mockUser: User = {
    username: 'ashish karki',
    id: mockID + ' for User',
    password: 'pw123',
    tasks: [],
  };

  const mockTask: Task = {
    id: mockID + ' for Task',
    title: 'Mock task',
    description: 'Mock description',
    status: TaskStatus.OPEN,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksReposirtory.getTasks and returns a list of tasks', async () => {
      tasksRepository.getTasks.mockResolvedValue('some-value');

      const result = await tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('some-value');
    });
  });

  describe('getTaskById', () => {
    it('returns task for given ID', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(mockID, mockUser);

      expect(result).toEqual(mockTask);
    });

    it('throws NotFoundException if task is not found', async () => {
      tasksRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById(mockID, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
