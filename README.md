# StarWars - CRUD system
Simply CRUD system only on backend side.

### Technology:
1. TypeScript
2. NodeJS
3. Serverless (https://www.serverless.com/)
4. DynamoDB
5. Jest
6. Eslint
7. Swagger/OpenAPI

------------

### Architecture
[![serverless](serverless "serverless")](https://miro.medium.com/max/1272/1*MFvtJPjmug6qbWa92mp5UA.png "serverless")

Descriptions:
Here I used standard SOLID, KISS and AWS architecture-well practices. But in my opinion better is use other database - dynamoDB is not well.
In my opinion better is use MongoDB where we have a really great driver to control data (mongoose).

IaC:
Is included in serverless.yml -> from this file our framework will convert it to cloudFormation script and send to aws.

Test:
For test I used Jest - to check only services function.
Also to check endpoints I used PostMan -> /test/starwars.postman_collection.json.

ApiDoc:
Here I generate a file with our API from our server. It's availablein directory /doc/index.html + swagger.yml. Right now you can check it without run server.

Folder structure:
- schemas -> schema important for ApiGateway
- seeds -> default data to DataBase
- src
	- controllers -> Here we have all controllers used in our system
	- endpoints -> Directly connected with path
	- errors -> Classes and handler with error return
	- models -> Models all interface for TypeScript
	- services -> Responsible for one task for example: dynamoDB
	- utils -> All important elements what we can use everywhere
- test -> Test part by Jest and collection from PostMan

### Installation:
0. `npm install -g serverless`

1. `npm install`

2. `sls dynamodb install`

3. `sls offline start`

### Deploy part:
To deplot use: `sls deploy --stage dev`
If you want check a correct configure part use `sls --noDeploy`

### Listening
Lambda:  http://localhost:3002/
NodeJs: http://localhost:3003/
DynamoDB: http://localhost:8000/
