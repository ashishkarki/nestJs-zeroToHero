import { TaskStatus } from './task-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  status: TaskStatus;

  /**
   * Which user created this task: many-to-one
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
