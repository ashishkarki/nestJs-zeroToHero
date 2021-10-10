import { JwtStrategy } from './jwt.strategy';
import { JWT_MODULE_SECRET } from './../secrets/jwt-secrets';
import { UserRepository } from './users.repository';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // JwtModule exports a JwtService
      secret: JWT_MODULE_SECRET,
      signOptions: {
        expiresIn: 7200, // 7200 secs = 2 hours
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
