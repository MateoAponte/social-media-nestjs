import { SetMetadata } from '@nestjs/common';

export const ROL_KEY = 'rol';
export const Roles = (...args: string[]) => SetMetadata(ROL_KEY, args);
// Colocar la info del Rol/Roles en la metada de la petición
