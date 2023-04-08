import { Inject, Injectable, LoggerService } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { emailTemplate } from '../config/email.config';
import * as fs from 'fs'

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  
  send(emailData: any) {
    const { type, email, url } = emailData
    const { subject, sender, template } = emailTemplate[type]
    
    try {
      const buffer = fs.readFileSync(template);
      const mailOptions = {
        from: sender,
        to: email,
        subject: subject,
        html: buffer.toString()
          .replace('%%email%%', email)
          .replace('%%url%%', url)
          .replace('%%time%%', new Date().toISOString()),
      };

      this.mailerService.sendMail(mailOptions)
    } catch (e) {
      this.logger.error(`send email fail: ${e?.message}`, emailData)
    }
  }
}
