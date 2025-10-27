import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUserDto.dto';
import { PatchUserDto } from '../dtos/PathUserDto.dto';

@Injectable()
export class UsersRepositoryService {
  constructor(
    /**
     * Inject Users Repository
     */
    @InjectRepository(Users) private repo: Repository<Users>,
  ) {}

  // CRUD: CREATE, READ, UPDATE, DELETE
  createUser(body: CreateUserDto) {
    const user = this.repo.create(body); // Crear un molde pero no lo asigna
    return this.repo.save(user); // Guardandolo en DB
  }
  findUserById(id: number) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }
  findUserByEmail(email: string) {
    return this.repo.findOne({
      where: {
        email,
      },
    });
  }
  updateUser(id: number, body: PatchUserDto) {
    const user = this.findUserById(id);
    if (!!user) {
      return this.repo.update(
        { id },
        {
          ...body,
        },
      );
    }
  }
  deleteUser(id: number) {
    return this.repo.delete({
      id,
    });
  }
}
