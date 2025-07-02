# API Gateway Routes

| Endpoint             | Method | Description                           |
| -------------------- | ------ | ------------------------------------- |
| /generate-upload-url | POST   | Get pre-signed S3 URL for file upload |
| /submit              | POST   | Save resume metadata, send SNS alert  |

## CORS Configuration

- Allowed Origins: `*`
- Allowed Headers: `*`
- Allowed Methods: `POST`
