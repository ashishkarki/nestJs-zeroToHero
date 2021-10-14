import { Entity, PrimaryColumn, ObjectIdColumn, Column } from 'typeorm';

/**
 * TypeOrm specific entity class
 */
@Entity()
export class StudentEntity {
  /**
   * Internal object ID from mongoDB
   */
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
