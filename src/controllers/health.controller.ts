import { JsonController, Get, Res } from 'routing-controllers';
import { ResponseType, ResponseContentType } from '../types';
import { ResponseUtil } from '../utils';

@JsonController('/health')
export class LivenessController {
    @Get('/live')
    // eslint-disable-next-line class-methods-use-this
    public async live(@Res() res: ResponseContentType): Promise<ResponseType> {
        return ResponseUtil.ok({ message: 'app is live' }, res);
    }

    @Get('/ready')
    // eslint-disable-next-line class-methods-use-this
    public async ready(@Res() res: ResponseContentType): Promise<ResponseType> {
        return ResponseUtil.ok({ message: 'app is ready' }, res);
    }
}
