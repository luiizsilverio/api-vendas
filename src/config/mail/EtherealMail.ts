import nodemailer from 'nodemailer'
import HbsMailTemplate from './HbsMailTemplate'

interface ITemplateData {
  [key: string]: string | number
}

interface IMailTemplate {
  template: string;
  variables: ITemplateData
}

interface IMailContact {
  name: string
  email: string
}

interface ISendMail {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IMailTemplate   // body: string
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const account = await nodemailer.createTestAccount()

    const mailTemplate = new HbsMailTemplate()

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass  // generated ethereal password
      }
    })

    // send mail with defined transport object
    // const message = await transporter.sendMail({
    //   from: 'luiiz.silverio@gmail.com',
    //   to,
    //   subject: 'Recuperação de senha',
    //   text: body
    // })

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vebdas',
        email: from?.email || 'luiiz.silverio@gmail.com'
      },
      to: {
        name: to.name,
        email: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData)
    })

    // getTestMessageUrl only available when sending through an Ethereal account
    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

/*
Ethereal account ( https://ethereal.email/messages )

name: Finn Stamm
username: finn.stamm61@ethereal.email
password: bZJNARPDWk22cFHbzQ

Nodemail configuraton:
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'finn.stamm61@ethereal.email',
        pass: 'bZJNARPDWk22cFHbzQ'
    }
});

Security: STARTTLS

IMAP configuration:
host: 'imap.etherial.email'
port: 993
Security: TLS
username: 'finn.stamm61@ethereal.email',
password: 'bZJNARPDWk22cFHbzQ'

POP3 configuration:
host: 'pop3.ethereal.email
port: 995
Security: TLS
username: 'finn.stamm61@ethereal.email',
password: 'bZJNARPDWk22cFHbzQ'
*/
