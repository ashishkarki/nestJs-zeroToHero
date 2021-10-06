import { JwtSignedToken } from './jwt-payload.interface';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<JwtSignedToken> {
    return this.authService.signIn(authCredentialsDto);
  }

  // dummy request for test purposes only
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() request) {
    console.log(request);
  }
}
