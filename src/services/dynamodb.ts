import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { CharacterItem } from '../models/CharacterItem'
import { UpdateCharacterRequest } from '../models/UpdateCharacterRequest'

const _createDynamoDBClient = () => {
  if (process.env.JEST_WORKER_ID) {
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  } else {
    const XAWS = AWSXRay.captureAWS(AWS)
    if (process.env.IS_OFFLINE) {
      return new XAWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      })
    }

    return new XAWS.DynamoDB.DocumentClient()
  }
}

export default class DynamoDB {

  constructor(
    private readonly docClient: DocumentClient = _createDynamoDBClient(),
    private readonly todoTable = process.env.CHARACTERS_TABLE || 'Starwars-dev',
  ) { }

  async getCharacterById(characterId: string): Promise<CharacterItem[]> {
    const result = await this.docClient.query({
      TableName: this.todoTable,
      KeyConditionExpression: 'characterId = :characterId',
      ExpressionAttributeValues: {
        ':characterId': characterId
      }
    }).promise()
    console.log(result);

    return result.Items as CharacterItem[]
  }

  async getAllCharacters(characterId: string): Promise<CharacterItem[]> {
    let params;
    const TableName = this.todoTable
    const Limit = 10;

    if (characterId) params = { TableName, Limit, ExclusiveStartKey: { characterId } }
    else params = { TableName, Limit }

    const result = await this.docClient.scan(params).promise()

    return result.Items as CharacterItem[]
  }

  async createCharacter(todo: CharacterItem): Promise<CharacterItem> {

    await this.docClient.put({
      TableName: this.todoTable,
      Item: todo
    }).promise()

    return todo
  }

  async updateCharacter(updateRequest: UpdateCharacterRequest): Promise<CharacterItem> {

    const updated = await this.docClient.update({
      TableName: this.todoTable,
      Key: { 'characterId': updateRequest.characterId },
      UpdateExpression: 'set #name = :name, #episodes = :episodes, #friends = :friends',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#episodes': 'episodes',
        '#friends': 'friends'
      },
      ExpressionAttributeValues: {
        ':name': updateRequest.name,
        ':episodes': updateRequest.episodes,
        ':friends': updateRequest.friends
      },
      ReturnValues: 'ALL_NEW'
    }).promise()

    return updated.Attributes as CharacterItem
  }

  async deleteCharacter(characterId: string) {
    return this.docClient.delete({
      TableName: this.todoTable,
      Key: { 'characterId': characterId }
    }).promise()
  }
}
