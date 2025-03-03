//Assignment 1
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.TABLE_NAME || "ShortenedURLs"; 
const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const generateShortCode = (): string => Math.random().toString(36).substring(2, 8);

export async function lambdaHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    if (event.httpMethod === "POST" && event.path === "/shorten") {
      if (!event.body) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing request body" }) };
      }

      const body = JSON.parse(event.body);
      const { url } = body;
      if (!url) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing URL" }) };
      }

      const shortCode = generateShortCode();

      // Store in DynamoDB
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: { shortCode, url }
      }));

      return {
        statusCode: 200,
        body: JSON.stringify({ shortUrl: `https://39ulo8a9se.execute-api.us-east-1.amazonaws.com/Prod/${shortCode}` })
      };
    }

    if (event.httpMethod === "GET") {
      const shortCode = event.pathParameters?.shortCode;
      if (!shortCode) {
        return { statusCode: 400, body: JSON.stringify({ error: "ShortCode is required" }) };
      }

      // Retrieve from DynamoDB
      const result = await docClient.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { shortCode }
      }));

      console.log(result.Item?.url);

      if (!result.Item?.url) {
        return { statusCode: 404, body: JSON.stringify({ error: "Short URL not present." }) };
      }

      return { 
        statusCode: 301, 
        headers: { Location: result.Item?.url }, 
        body: "" 
      };
    }

    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request" }) };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
}

