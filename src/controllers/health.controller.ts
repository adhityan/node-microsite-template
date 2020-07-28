import { ResponseSchema } from 'routing-controllers-openapi';
import { JsonController, Get } from 'routing-controllers';
import { GenericResponse } from '../models';

@JsonController('/health')
export class LivenessController {
    /*
     * Health liveniess API endpoint
     */
    @Get('/live')
    @ResponseSchema(GenericResponse)
    // eslint-disable-next-line class-methods-use-this
    public async live(): Promise<GenericResponse> {
        return new GenericResponse('Health status OK', 200);
    }

    /*
     * Health readiness API endpoint
     */
    @Get('/ready')
    @ResponseSchema(GenericResponse)
    // eslint-disable-next-line class-methods-use-this
    public async ready(): Promise<GenericResponse> {
        return new GenericResponse('Health status OK', 200);
    }
}
