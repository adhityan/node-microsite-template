import { JsonController, Get, Res } from 'routing-controllers';
import { ResponseType, ResponseContentType } from '../types';
import { ResponseUtil } from '../utils';

@JsonController('/temperature')
export class TemperatureController {
    @Get('/recordit')
    // eslint-disable-next-line class-methods-use-this
    public async live(@Res() res: ResponseContentType): Promise<ResponseType> {
        return ResponseUtil.ok({ message: 'working' }, res);
    }
}
