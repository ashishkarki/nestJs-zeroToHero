import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

/**
 * TypeOrm specific entity class
 */
@Entity()
export class LessonEntity {
  /**
   * Internal object ID from mongoDB
   */
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;
}
