import { Action } from 'routing-controllers';

// eslint-disable-next-line
export const authorizationChecker = (_action: Action, _roles: string[]): boolean => true;

// eslint-disable-next-line
export const currentUserChecker = (_action: Action): Record<string, unknown> | null => null;

