import { ResponseSchema } from 'routing-controllers-openapi';
import { JsonController, Get } from 'routing-controllers';

import { HealthResponse } from '../models';

@JsonController('/health')
export class LivenessController {
    /*
     * Health liveniess API endpoint
     */
    @Get('/live')
    @ResponseSchema(HealthResponse)
    // eslint-disable-next-line class-methods-use-this
    public async live(): Promise<HealthResponse> {
        return new HealthResponse('Health status OK', 200);
    }

    /*
     * Health readiness API endpoint
     */
    @Get('/ready')
    @ResponseSchema(HealthResponse)
    // eslint-disable-next-line class-methods-use-this
    public async ready(): Promise<HealthResponse> {
        return new HealthResponse('Health status OK', 200);
    }
}
