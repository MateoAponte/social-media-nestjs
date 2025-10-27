import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AT_SECRET } from '../constants/ATSecret';
import { AesProvider } from './aes-provider';
import { AES_KEY } from '../constants/AESKey';

@Injectable() // Yo le dire que hacer con al Access Token
export class JwtAtStrategy extends PassportStrategy(Strategy, 'token') {
  constructor(
    /**
     * Inject AES Provider
     */
    readonly aesProvider: AesProvider,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: aesProvider.decrypt(AT_SECRET, AES_KEY),
    });
  }

  validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      rol: payload.rol,
      activities: payload.activities,
    };
  }
}
