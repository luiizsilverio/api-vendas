import hbs from 'hbs'

interface ITemplateData {
  [key: string]: string | number
}

interface IMailTemplate {
  template: string;
  variables: ITemplateData
}

export default class HbsMailTemplate {
  public async parse({template, variables}: IMailTemplate): Promise<string> {
    const parseTemplate = hbs.parseTemplate(template)

    return parseTemplate(variables)
  }
}