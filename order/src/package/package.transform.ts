import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PackageTransform {
  constructor(
    private readonly configService: ConfigService
  ) {}

  async getSigned(file: string) {
    const clientParams = {
      credentials: {
        accessKeyId: this.configService.get('aws.id'),
        secretAccessKey: this.configService.get('aws.secret'),
      },
      region: this.configService.get('aws.region')
    }

    const client = new S3Client(clientParams);
    const command = new GetObjectCommand({
      Bucket: this.configService.get('aws.bucket'),
      Key: file,
    });
    return await getSignedUrl(client, command, { expiresIn: 300 });
  }

  async recursive(data, results) {
    if (data.length < 1) {
      return results
    } else {
      const current = data.pop()
      try {
        current.image = await this.getSigned(current.image)
        results.push(current)

      } catch (e) {

      }

      return this.recursive(data, results)
    }
  }
}