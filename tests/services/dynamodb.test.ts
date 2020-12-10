import { describe, it, expect } from '@jest/globals';

import DynamoDB from '../../src/services/dynamodb';
import { UpdateCharacterRequest } from '../../src/models/UpdateCharacterRequest';

const CHARACTER_ID = '123'
const NAME = 'Created from tests'

describe('service dynamodb tests', () => {

    it('should create person', async () => {
        const CreateCharacterRequest = {
            characterId: CHARACTER_ID,
            name: NAME,
            friends: [],
            episode: []
        };

        const todo = await new DynamoDB().createCharacter(CreateCharacterRequest);

        expect(todo.characterId).toBeDefined();
        expect(todo.name).toEqual(NAME);
    })

    it('should return all person by id', async () => {
        const characters = await new DynamoDB().getCharacterById(CHARACTER_ID);

        expect(characters.length).toBeGreaterThan(0);
    })

    it('should update a person', async () => {
        const CreateCharacterRequest: UpdateCharacterRequest = {
            characterId: CHARACTER_ID,
            name: NAME,
            friends: [],
            episode: []
        };

        const todoToUpdate = await new DynamoDB().updateCharacter(CreateCharacterRequest);

        const UpdateCharacterRequest: UpdateCharacterRequest = {
            characterId: todoToUpdate.characterId,
            name: todoToUpdate.name,
            friends: [],
            episode: []
         };

        const todoUpdated = await new DynamoDB().updateCharacter(UpdateCharacterRequest);

        expect(todoUpdated).toBeDefined();
        expect(todoUpdated.characterId).toEqual(todoToUpdate.characterId);
        expect(todoUpdated.name).toEqual(todoToUpdate.name);
    })

    it('should delete a person', async () => {
        const CreateCharacterRequest = {
          characterId: CHARACTER_ID,
          name: NAME,
          friends: [],
          episode: []
        };

        const todoToDelete = await new DynamoDB().createCharacter(CreateCharacterRequest);
        await new DynamoDB().deleteCharacter(todoToDelete.characterId);

        const todosAfterDeletion = await new DynamoDB().getCharacterById(CHARACTER_ID);
        const deleted = todosAfterDeletion.every(value => value.characterId !== todoToDelete.characterId);
        expect(deleted).toBeTruthy();
    })
})
