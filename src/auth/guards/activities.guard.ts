import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ACTIVITY_KEY } from '../decorators/activites.decorator';

@Injectable()
export class ActivitiesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // Nos permite leer la meta-data

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredActivities = this.reflector.getAllAndOverride<string[]>(
      ACTIVITY_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredActivities) return true;

    const { user } = context.switchToHttp().getRequest();

    return requiredActivities.some(
      (activity) =>
        user.activities.findIndex((userActivity) => userActivity === activity) >
        -1,
    );
  }
}

// findIndex,
// ? Si se encuentra un elemento que coincida retorna la posición
// : Si no, retorno -1
