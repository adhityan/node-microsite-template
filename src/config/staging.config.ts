import * as path from 'path';
import { BaseConfig } from './base.config';

class Staging extends BaseConfig {
    DB_PATH: string = path.resolve(process.execPath, '../db');
}

export const staging = new Staging();