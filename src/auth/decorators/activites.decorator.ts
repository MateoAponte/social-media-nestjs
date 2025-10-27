import { SetMetadata } from '@nestjs/common';

export const ACTIVITY_KEY = 'activities';
export const Activities = (...args: string[]) =>
  SetMetadata(ACTIVITY_KEY, args);
