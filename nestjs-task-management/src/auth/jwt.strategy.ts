import { JwtPayload } from './jwt-payload.interface';
import { JWT_MODULE_SECRET } from './../secrets/jwt-secrets';
import { UserRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Tells PassportJs how to reac/decode an accessToken
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
  ) {
    super({
      secretOrKey: JWT_MODULE_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * now that the token is valid, we return that user object
   * which passportJs injects into the request object so
   * that the current user object is available everywhere
   */
  validate = async (payload: JwtPayload) => {
    const { username } = payload;
    const user = await this.usersRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    return user;
  };
}
