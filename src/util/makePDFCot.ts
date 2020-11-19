import { Response } from "express";
import pdf from "html-pdf";
import path from "path";
import { QuotationData } from "../models/Quotation/Quotation";
import { _pdf } from "./pdf";
import fs from "fs";
import { s3 } from "../db/aws-s3";

export const createPDF = (
  quotationData: QuotationData,
  res: Response
): Promise<string> =>
  new Promise((resolve, reject) => {
    const qtoId = quotationData.quotation_id;
    const quotationFileName = `${qtoId}.pdf`;

    // Quotations stored in the Quotations file can be deleted,
    // All the quotations are stored in s3
    // Just for the seek of sending the email we need to store in some place
    // the attachment of pdf email shouldn't be buffer or a blob
    const filePath = path.join(
      __dirname,
      "..",
      "quotations",
      quotationFileName
    );
    pdf.create(_pdf(quotationData)).toStream((err, stream) => {
      if (err) console.log(err);

      const params = {
        Bucket: "solar-panel-s3",
        Key: quotationFileName,
        Body: stream,
      };
      s3.upload(params, {}, (err, _data) => {
        if (err) throw err;
      });
    });

    pdf.create(_pdf(quotationData)).toFile(filePath, function (err, res) {
      if (err) return reject("CANNOT CREATE THE PDF");
      resolve(res.filename);
    });

    return filePath;
  });
