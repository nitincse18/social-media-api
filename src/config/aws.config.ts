// app.service.ts
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private s3: AWS.S3;

  constructor() {
    // Set up AWS credentials and region
    AWS.config.update({
      accessKeyId: 'AKIARS3MFKKZI5AIE54X',
      secretAccessKey: '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',
      region: 'ap-south-1',
      
    });

    // Create an S3 instance
    this.s3 = new AWS.S3();
  }

  async uploadToS3(file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    const params: AWS.S3.Types.PutObjectRequest = {
      Bucket: 'social-media-08-06',
      ACL: 'public-read',
      Key: 'post-'+new Date().toISOString() , // Use the original file name as the key
      Body: file?.buffer,
    };

    // Upload the file to S3
    return this.s3.upload(params).promise();
  }
}
