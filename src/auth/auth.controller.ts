import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dtos/LoginDto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { EncryptDto } from './dtos/EncryptDto';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Inject Auth Service
     */
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard('refresh-token'))
  @Post('refresh')
  refresh(@Req() req: any) {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader.split(' ')[1]; // ["Bearer", "Token"]
    return this.authService.refresh(refreshToken);
  }

  @Post('encrypt')
  encrypt(@Body() encrypt: EncryptDto) {
    return this.authService.encrypt(encrypt);
  }
}
