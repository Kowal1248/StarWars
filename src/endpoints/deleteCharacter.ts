import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'

import CrudController from '../controllers/CrudController'
import { errorHandler } from '../errors/errorHandler'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const characterId = event.pathParameters.characterId

    await CrudController.deleteCharacter(characterId)

    return { statusCode: 200, body: '' }
  } catch (error) {
    return errorHandler(error)
  }
})
