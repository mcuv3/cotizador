import * as dotenv from "dotenv";
import aws from "aws-sdk";
dotenv.config();

aws.config.update({
  accessKeyId: "",
  region: "us-east-2",
  secretAccessKey: "",
});

export const s3 = new aws.S3();
