import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(TypeOrmExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(
      `TypeORM Exception: ${exception.message}`,
      exception.stack,
    );

    const errorResponse = {
      statusCode: 500,
      message: 'Internal server error',
    };

    const codeMapper = {
      '23505': {
        statusCode: 409,
        message: 'Duplicate entry',
      },
      '23503': {
        statusCode: 404,
        message: 'Related entity not found',
      },
    };

    if (Object.keys(codeMapper).includes(exception.code)) {
      const { statusCode, message } = codeMapper[exception.code];
      errorResponse.statusCode = statusCode;
      errorResponse.message = message;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = errorResponse.statusCode;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorResponse.message,
    });
  }
}
