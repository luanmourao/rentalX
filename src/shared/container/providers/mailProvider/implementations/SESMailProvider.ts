import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import { SES } from "aws-sdk";
import { IMailProvider } from "../IMailProvider";
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION
      })
    });
  }
  
  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

    // leitura do arquivo e parseamento para String
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    // parseamento para um formato conhecido do Handlebars
    const templateParse = handlebars.compile(templateFileContent); // retorna uma função

    // envio das variáveis para alimentar a template
    const templateHtml = templateParse(variables);

    await this.client.sendMail({
      from: "RentalX <lua@lmourao.com>",
      to,
      subject,
      html: templateHtml
    });

  }

}

export { SESMailProvider };