import { Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryService } from './users.repository.service';
import { CreateUserDto } from '../dtos/CreateUserDto.dto';
import { PatchUserDto } from '../dtos/PathUserDto.dto';
import { AuthService } from 'src/auth/auth.service';
import { CheckUserDto } from '../dtos/CheckUserDto.dto';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Inject Repository Service
     */
    @Inject()
    private readonly usersRepositoryService: UsersRepositoryService,

    /**
     * Inject Auth Service to hash pass
     */
    private readonly authService: AuthService,
  ) {}

  async createUser(body: CreateUserDto) {
    const hashPass = await this.authService.hashPassword(body.password);
    return this.usersRepositoryService.createUser({
      ...body,
      password: hashPass,
    });
  }
  getUserByEmail(email: string) {
    return this.usersRepositoryService.findUserByEmail(email);
  }
  getUserById(id: number) {
    return this.usersRepositoryService.findUserById(id);
  }
  async checkUser(body: CheckUserDto) {
    const user = await this.getUserByEmail(body.email);
    if (!!user) {
      const isValidate = await this.authService.checkAuthenticatedUser(
        body.password,
        user.password,
      );
      return isValidate
        ? 'Las credenciales son correctas. ¡Estas loggeado!'
        : '¿Quién eres? Salte de mi rancho';
    } else {
      return 'No se encontro el usuario';
    }
  }
  updateUser(id: number, body: PatchUserDto) {
    return this.usersRepositoryService.updateUser(id, body);
  }
  deleteUser(id: number) {
    return this.usersRepositoryService.deleteUser(id);
  }
}
