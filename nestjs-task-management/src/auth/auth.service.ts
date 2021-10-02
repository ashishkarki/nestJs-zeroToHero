import { UserRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}

  signUp = async (authCredentialsDto: AuthCredentialsDto) => {
    return this.userRepo.createUser(authCredentialsDto);
  };
}
