import { config as loadEnvConfig } from 'dotenv';

import { development } from './development.config';
import { production } from './production.config';
import { test } from './test.config';
import { BaseConfig } from './base.config';

loadEnvConfig();

let env: string = process.env.NODE_ENV || 'development';

const configs: { [key: string]: BaseConfig } = {
    development,
    production,
    test,
};

if (!configs[env]) {
    console.error(`Configuration not found for ${env}, forcing to use development`);
    env = 'development';
}

export const Config = configs[env];
