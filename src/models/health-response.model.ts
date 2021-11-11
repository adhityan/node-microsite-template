import { ResponseBase } from '@adhityan/gc-doc';
import { IsString, IsNumber } from 'class-validator';

export class HealthResponse extends ResponseBase {
    constructor(message: string, statusCode?: number) {
        super();
        this.message = message.trim();
        this.statusCode = statusCode ?? 200;
    }

    @IsString()
    message: string;

    @IsNumber()
    statusCode: number;
}
