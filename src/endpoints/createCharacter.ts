import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'

import CrudController from '../controllers/CrudController'
import { CreateCharacterRequest } from '../models/CreateCharacterRequest'
import { validation } from '../utils/validation';
import { errorHandler } from '../errors/errorHandler'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body)
    const createCharacterRequest: CreateCharacterRequest = { ...JSON.parse(body) }
    await validation(['name', 'friends', 'episodes'], createCharacterRequest)

    const result = await CrudController.createCharacter(createCharacterRequest)

    return { statusCode: 201, body: JSON.stringify(result) }
  } catch (error) {
    return errorHandler(error)
  }
})
