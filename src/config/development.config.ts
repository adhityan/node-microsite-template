import { BaseConfig } from './base.config';

class Development extends BaseConfig {
    FIREBASE_URL = 'https://gc-saleskey.firebaseio.com';

    SEND_OTP = false;
}

export const development = new Development();
