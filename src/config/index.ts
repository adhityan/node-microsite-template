import { config as loadEnvConfig } from 'dotenv';
import { Logger } from '@adhityan/gc-logger';

import { development } from './development.config';
import { production } from './production.config';
import { staging } from './staging.config';
import { test } from './test.config';
import { BaseConfig } from './base.config';

loadEnvConfig();

let env: string = process.env.NODE_ENV?.toLowerCase() || 'development';

const configs: { [key: string]: BaseConfig } = {
    development,
    production,
    staging,
    test,
};

if (!configs[env]) {
    Logger.error(`Configuration not found for ${env}, using development instead`);
    env = 'development';
}

export const Config = configs[env];
