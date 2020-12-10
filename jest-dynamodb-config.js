module.exports = {
  tables: [
    {
      TableName: 'Starwars-test4',
      KeySchema: [
        { AttributeName: 'characterId', KeyType: 'HASH'},
      ],
      AttributeDefinitions: [
        { AttributeName: 'characterId', AttributeType: 'S' },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'SecondUserIdIndex',
          KeySchema: [
            { AttributeName: 'characterId', KeyType: 'HASH' }
          ],
          Projection: { ProjectionType: 'ALL' },
          ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
        }
      ]
    },
  ],
  port: 8000
};
