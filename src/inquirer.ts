import inquirer, { Question } from 'inquirer'
import { DecryptFileOptions } from './commands/decrypt-file'

export type QuestionKey = keyof DecryptFileOptions

const questions: Record<QuestionKey, Question> = {
  path: {
    type: 'input',
    name: 'path',
    message: 'path to the file',
  },
  key: {
    type: 'input',
    name: 'key',
    message: 'decryption key',
  },
  iv: {
    type: 'input',
    name: 'iv',
    message: 'initialization vector',
  },
}

export const requestMissingData = async (data: QuestionKey[]) => {
  const additionalQuestions = Object.entries(questions)
    .map(([questionKey, question]) => {
      return !data.includes(questionKey as QuestionKey) && question
    })
    .filter(Boolean) as Question[]

  return inquirer.prompt(additionalQuestions)
}
