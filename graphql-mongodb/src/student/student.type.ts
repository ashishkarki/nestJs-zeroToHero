import { Field, ObjectType, ID } from '@nestjs/graphql';

/**
 * A GraphQL entity type
 */
@ObjectType('Student')
export class StudentType {
  @Field((_type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
