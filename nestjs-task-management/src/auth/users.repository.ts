import { POSTGRES_CODES } from './../utils/contants';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> => {
    const { username, password } = authCredentialsDto;

    // storing password in encrypted form
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: User = this.create({
      username,
      password: hashedPassword,
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

    return `User with name: '${createdUser.username} created successfully..'`;
  };
}
