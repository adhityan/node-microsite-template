import { ResponseSchema } from 'routing-controllers-openapi';
import { JsonController, Post, Body } from 'routing-controllers';
import { GenericResponse, TemperatureRequest } from '../models';

@JsonController('/example')
export class ExampleController {
    @Post('/temperature')
    @ResponseSchema(GenericResponse)
    // eslint-disable-next-line class-methods-use-this
    public async temperateureFromFrToCe(@Body() body: TemperatureRequest): Promise<GenericResponse> {
        return new GenericResponse(`Celcius value is ${(body.fahrenheit - 32) * 0.5556}`);
    }
}
