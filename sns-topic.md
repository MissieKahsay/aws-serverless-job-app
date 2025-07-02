# SNS Topic: ResumeSubmissionTopic

**Region:** us-east-2  
**ARN:** arn:aws:sns:us-east-2:194722406728:ResumeSubmissionTopic  
**Protocol:** Email  
**Subscriber:** [Your email address]

## Trigger Behavior

After a resume is uploaded and metadata is saved in DynamoDB, the Lambda function triggers this topic and sends an email:

**Email Content Example:**
