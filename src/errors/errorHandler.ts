import { createLogger } from '../utils/logger'

export const errorHandler = (error, name:string) => {
  const logger = createLogger(name)
  logger.error(`${error}`)

  return {
    statusCode: error.statusCode || 500,
    body: JSON.stringify({
      code: error.code || `InternalServerError`,
      message: error.message })
    }
  }
