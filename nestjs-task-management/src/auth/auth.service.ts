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
    // eslint-disable-next-line prettier/prettier
    const {
      username: userTypedName,
      password: userTypedPassword,
      // eslint-disable-next-line prettier/prettier
    } = authCredentialsDto;

    // does this user exist ? but don't give the user any hint
    const userObjFromDB = await this.userRepo.findOne({
      username: userTypedName,
    });

    // compare the input 'password' with stored 'user.password'
    if (
      userObjFromDB &&
      (await bcrypt.compare(userTypedPassword, userObjFromDB.password))
    ) {
      const payload: JwtPayload = { username: userTypedName };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken }; // customary to return this as object
    } else {
      throw new UnauthorizedException('Please check your login credentials!!');
    }
  };
}
