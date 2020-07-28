import { ResponseBase } from '@adhityan/gc-doc';
import { IsString, IsNumber } from 'class-validator';

export class GenericResponse extends ResponseBase {
    @IsString()
    message: string;

    @IsNumber()
    statusCode: number;

    constructor(message: string, statusCode?: number) {
        super();
        this.message = message.trim();
        this.statusCode = statusCode ?? 200;
    }
}
