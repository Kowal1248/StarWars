import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';

import CrudController from '../controllers/CrudController';
import { validation } from '../utils/validation';
import { errorHandler } from '../errors/errorHandler'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    let lastSearch: string = null

    if (event.queryStringParameters){
      await validation(['lastSearch'], event.queryStringParameters)
      lastSearch = event.queryStringParameters.lastSearch;
    }

    const items = await CrudController.getAllCharacters(lastSearch);

    return { statusCode: 200, body: JSON.stringify(items) };
  } catch (error) {
    return errorHandler(error)
  }
})
