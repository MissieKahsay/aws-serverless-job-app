# DynamoDB Table: JobApplications

| Field      | Type   | Description             |
| ---------- | ------ | ----------------------- |
| userId     | String | Unique user identifier  |
| fileName   | String | Name of uploaded file   |
| uploadedAt | String | ISO timestamp of upload |

## Key Schema

- Partition Key: `userId`
