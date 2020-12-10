import { GenericError } from './GenericError';

export class BadRequestError extends GenericError {
  public code = 'BadRequest';

  public statusCode = 400;
}
