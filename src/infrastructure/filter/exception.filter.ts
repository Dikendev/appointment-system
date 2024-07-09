import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const status = exception.getResponse();
    const message = exception.message;

    response.status(status).json({
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
