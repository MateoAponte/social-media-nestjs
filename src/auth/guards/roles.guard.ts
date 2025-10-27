import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROL_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // Nos permite leer la meta-data

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROL_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // RequiredRoles: 'admin'

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    // User Retorna toda la información que yo coloque dentro del Passport
    // Obtener la petición (Viene del contexto -> Para cambiarla a http)
    // Extraer al usuario de la petición

    return requiredRoles.some((rol) => user.rol === rol);
  }
}
