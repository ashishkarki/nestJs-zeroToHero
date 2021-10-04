import { JwtPayload, JwtSignedToken } from './jwt-payload.interface';
import { UserRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,

    private jwtService: JwtService,
  ) {}

  signUp = async (authCredentialsDto: AuthCredentialsDto) => {
    return this.userRepo.createUser(authCredentialsDto);
  };

  signIn = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<JwtSignedToken> => {
    const { username, password } = authCredentialsDto;

    // does this user exist ? but give the user any hint
    const user = await this.userRepo.findOne({ username: username });

    // compare the input 'password' with stored 'user.password'
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken }; // customary to return this as object
    } else {
      throw new UnauthorizedException('Please check your login credentials!!');
    }
  };
}
