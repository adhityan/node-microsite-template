import { BaseConfig } from './base.config';

class Development extends BaseConfig {
    DB_SYNCHRONIZE = true;
}

export const development = new Development();
