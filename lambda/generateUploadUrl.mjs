import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-2" });

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { userId, fileName } = body;

    const key = `${userId}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: "job-app-resumes-mk",
      Key: key,
      ContentType: "application/pdf",
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadUrl, key }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate URL" }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
};
