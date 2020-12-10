import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'

import CrudController from '../controllers/CrudController'
import { UpdateCharacterRequest } from '../models/UpdateCharacterRequest'
import { errorHandler } from '../errors/errorHandler'
import { validation } from '../utils/validation';

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const characterId = event.pathParameters.characterId
    const body = JSON.parse(event.body)

    const updateCharacterRequest: UpdateCharacterRequest = { ...JSON.parse(body), characterId }
    await validation(['name', 'friends', 'episodes'], updateCharacterRequest)

    await CrudController.updateCharacters(updateCharacterRequest)

    return { statusCode: 200, body: '' }
  } catch (error) {
    return errorHandler(error,'UpdateEndpoint')
  }
})
