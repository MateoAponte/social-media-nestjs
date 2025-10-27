import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RT_SECRET } from '../constants/RTSecret';
import { AesProvider } from './aes-provider';
import { AES_KEY } from '../constants/AESKey';

@Injectable()
export class JwtRtstrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(
    /**
     * Inject AES Provider
     */
    readonly aesProvider: AesProvider,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: aesProvider.decrypt(RT_SECRET, AES_KEY),
    });
  }

  validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
