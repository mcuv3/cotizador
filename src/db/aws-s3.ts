import * as dotenv from "dotenv";
import aws from "aws-sdk";
dotenv.config();

aws.config.update({
  accessKeyId: "AKIAXEUBOZVRN3DXAAJS",
  region: "us-east-2",
  secretAccessKey: "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",
});

export const s3 = new aws.S3();
