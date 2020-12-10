import * as uuid from 'uuid'

import DynamoDB from '../services/dynamodb'
import { CreateCharacterRequest } from '../models/CreateCharacterRequest'
import { UpdateCharacterRequest } from '../models/UpdateCharacterRequest'
import { CharacterItem } from '../models/CharacterItem'


export class CharactersController {

  dynamoDB: DynamoDB;

  constructor(dynamoDB: DynamoDB = new DynamoDB()) {
    this.dynamoDB = dynamoDB
  }

  async getAllCharacters(lastSearch: string): Promise<CharacterItem[]> {
    return this.dynamoDB.getAllCharacters(lastSearch)
  }

  async getCharacterById(characterId: string): Promise<CharacterItem[]> {
    return this.dynamoDB.getCharacterById(characterId);
  }

  async createCharacter(createRequest: CreateCharacterRequest): Promise<CharacterItem> {
    const characterId = uuid.v4()

    return await this.dynamoDB.createCharacter({
      characterId,
      name: createRequest.name,
      episodes: createRequest.episodes,
      friends: createRequest.friends
    })
  }

  async updateCharacters(updateRequest: UpdateCharacterRequest) {
    return await this.dynamoDB.updateCharacter(updateRequest)
  }

  async deleteCharacter(characterId: string) {
    return await this.dynamoDB.deleteCharacter(characterId)
  }

}

export default new CharactersController();
