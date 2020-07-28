import { RequestBase } from '@adhityan/gc-doc';
import { IsNotEmpty, IsInt } from 'class-validator';

export class TemperatureRequest extends RequestBase {
    @IsNotEmpty()
    @IsInt()
    fahrenheit: number;
}
