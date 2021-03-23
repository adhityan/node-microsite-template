import { Action } from 'routing-controllers';

export const authorizationChecker = (action: Action, roles: string[]): boolean => {
    return true;
};

export const currentUserChecker = (action: Action): {} | null => {
    return {};
};
