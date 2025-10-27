import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/LoginDto';
import { JwtProvider } from './providers/jwt-provider';
import { UsersRepositoryService } from 'src/users/providers/users.repository.service';
import { EncryptDto } from './dtos/EncryptDto';
import { AesProvider } from './providers/aes-provider';
import { AES_KEY } from './constants/AESKey';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Inject JWT Provider
     */
    private readonly jwtProvider: JwtProvider,

    /**
     * Inject Users Repository
     */
    @Inject()
    private readonly usersRepositoryService: UsersRepositoryService,

    /**
     * Inject AES Provider
     */
    private readonly aesProvider: AesProvider,
  ) {}

  async hashPassword(pass: string) {
    const salt = await bcrypt.genSalt(); // Cadena aleatoria de caracterés
    return await bcrypt.hash(pass, salt);
  }

  async compareHash(pass: string, hashPass: string) {
    return await bcrypt.compare(pass, hashPass);
  }

  async checkAuthenticatedUser(password: string, dbPassword: string) {
    // ... Lógica relacionada al proceso de autenticación
    return await this.compareHash(password, dbPassword);
  }

  async login(body: LoginDto) {
    const user = await this.usersRepositoryService.findUserByEmail(body.email);
    if (!!user === false)
      return {
        message: 'No se encontro el usuario',
      };

    const isValidate = await this.compareHash(body.password, user.password);
    if (!isValidate)
      return {
        message: 'Las credenciales son incorrectas',
      };

    return this.jwtProvider.signTokens(user);
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtProvider.refreshTokens(refreshToken);
    return this.jwtProvider.signTokens(payload);
  }

  encrypt(secret: EncryptDto) {
    const rts = this.aesProvider.encrypt(secret.RTSecret, AES_KEY);
    const ats = this.aesProvider.encrypt(secret.ATSecret, AES_KEY);
    return {
      rts,
      ats,
    };
  }
}
