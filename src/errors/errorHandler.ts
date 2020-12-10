export const errorHandler = (error) => {
  return {
    statusCode: error.statusCode || 500,
    body: JSON.stringify({
      code: error.code || `InternalServerError`,
      message: error.message })
    }
  }
