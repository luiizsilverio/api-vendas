import handlebars from 'handlebars'
import fs from 'fs'

interface ITemplateData {
  [key: string]: string | number
}

interface IMailTemplate {
  templateFile: string;
  variables: ITemplateData
}

export default class HbsMailTemplate {
  public async parse({ templateFile, variables }: IMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(templateFile, {
      encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}