import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUserDto.dto';

// Types Partial<Otro Type>
export class PatchUserDto extends PartialType(CreateUserDto) {}
