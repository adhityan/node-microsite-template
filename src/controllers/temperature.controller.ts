import { ResponseSchema } from 'routing-controllers-openapi';
import { JsonController, Post, Body } from 'routing-controllers';

import { HealthResponse, TemperatureRequest } from '../models';

@JsonController('/example')
export class ExampleController {
    @Post('/temperature')
    @ResponseSchema(HealthResponse)
    // eslint-disable-next-line class-methods-use-this
    public async temperateureFromFrToCe(@Body() body: TemperatureRequest): Promise<HealthResponse> {
        return new HealthResponse(`Celcius value is ${(body.fahrenheit - 32) * 0.5556}`);
    }
}
