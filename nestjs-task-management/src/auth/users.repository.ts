import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

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

    return await this.save(newUser);
  };
}
