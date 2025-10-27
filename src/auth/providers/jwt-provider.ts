import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/LoginDto';
import { JwtService } from '@nestjs/jwt';
import { AT_SECRET } from '../constants/ATSecret';
import { RT_SECRET } from '../constants/RTSecret';
import { Users } from 'src/users/users.entity';
import { AesProvider } from './aes-provider';
import { AES_KEY } from '../constants/AESKey';

@Injectable()
export class JwtProvider {
  constructor(
    /**
     * Inject JWT Service by Nest
     */
    private readonly jwtService: JwtService,

    /**
     * Inject AES Provider
     */
    private readonly aesProvider: AesProvider,
  ) {}

  signTokens(user: Users) {
    const jwtPayload = {
      id: user.id,
      email: user.email,
      rol: user.rol,
      activities: user.activities,
    };

    console.log(this.aesProvider.decrypt(AT_SECRET, AES_KEY));
    const access_token = this.jwtService.sign(jwtPayload, {
      secret: this.aesProvider.decrypt(AT_SECRET, AES_KEY),
      expiresIn: '15m',
    });
    const refresh_token = this.jwtService.sign(jwtPayload, {
      secret: this.aesProvider.decrypt(RT_SECRET, AES_KEY),
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }

  refreshTokens(refresh_token: string) {
    return this.jwtService.verify(refresh_token, {
      secret: RT_SECRET,
    });
  }
}
