import { GenericError } from './GenericError';

export class InternalError extends GenericError {
  public code = 'InternalServerError';

  public statusCode = 500;
}
