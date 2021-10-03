import { POSTGRES_CODES } from './../utils/contants';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> => {
    const { username, password } = authCredentialsDto;

    const newUser: User = this.create({
      username,
      password,
    });

    let createdUser: User = null;
    try {
      createdUser = await this.save(newUser);
    } catch (error) {
      if (error.code && error.code === POSTGRES_CODES.DUPLICATE_COLUMN_ENTRY)
        throw new ConflictException(
          `User with name: '${username}' already exists!!`,
        );
      else
        throw new InternalServerErrorException(
          `There was an error creating the user!!`,
        );
    }

    return createdUser;
  };
}
