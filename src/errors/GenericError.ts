export abstract class GenericError extends Error {
  public statusCode = 500;

  public code = 'InternalServerError';

  constructor(message?: string, properties?: Record<string, any>) {
    super(message);

    Object.defineProperty(this, 'name', { value: this.constructor.name });

    if (properties) {
      Object.keys(properties).forEach((key) => {
        (this as any)[key] = properties[key];
      });
    }
  }
}
