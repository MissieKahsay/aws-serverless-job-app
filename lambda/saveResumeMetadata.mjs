import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const ddb = new DynamoDBClient({ region: "us-east-2" });
const sns = new SNSClient({ region: "us-east-2" });

const TABLE_NAME = "JobApplications";
const TOPIC_ARN = "arn:aws:sns:us-east-2:194722406728:ResumeSubmissionTopic";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { userId, fileName } = body;

    const uploadedAt = new Date().toISOString();

    const params = {
      TableName: TABLE_NAME,
      Item: {
        userId: { S: userId },
        fileName: { S: fileName },
        uploadedAt: { S: uploadedAt },
      },
    };

    await ddb.send(new PutItemCommand(params));

    const msg = `New resume submitted:\n\nUser ID: ${userId}\nFile: ${fileName}\nTime: ${uploadedAt}`;

    await sns.send(
      new PublishCommand({
        Message: msg,
        TopicArn: TOPIC_ARN,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Metadata saved and notification sent",
        item: params.Item,
      }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save or notify" }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
};
