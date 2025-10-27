import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAtStrategy } from './providers/jwt-atstrategy';
import { JwtRtstrategy } from './providers/jwt-rtstrategy';
import { JwtProvider } from './providers/jwt-provider';
import { UsersModule } from 'src/users/users.module';
import { AesProvider } from './providers/aes-provider';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAtStrategy, JwtRtstrategy, JwtProvider, AesProvider],
  exports: [AuthService],
})
export class AuthModule {}
