import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'

import CrudController from '../controllers/CrudController'
import { errorHandler } from '../errors/errorHandler'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const characterId = event.pathParameters.characterId;
    const items = await CrudController.getCharacterById(characterId)

    return { statusCode: 200, body: JSON.stringify(items) }
  } catch (error) {
    return errorHandler(error)
  }
})
