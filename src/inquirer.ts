import inquirer, { Question } from 'inquirer'
import { DecryptFileOptions } from './commands/decrypt-file'
import { readFileSafe } from './filesystem'

export type QuestionKey = keyof DecryptFileOptions

const questions: Record<QuestionKey, Question> = {
  path: {
    type: 'input',
    name: 'path',
    message: 'path to the file',
    async validate(input: string): Promise<boolean | string> {
      try {
        await readFileSafe(input)
        return true
      } catch (err) {
        return err instanceof Error
          ? err.message
          : 'Something went wrong when trying to access the file'
      }
    },
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
  output: {
    type: 'input',
    name: 'output',
    message: 'path to the output file, leave empty to print to stdout',
  },
}

/**
 * @name requestMissingData
 * @summary spawns interactive prompt to retrieve user input that was not given by the user yet
 * @param {QuestionKey[]} data keys of the data that is already specified
 * @returns {Record<QuestionKey, string>>} object with the requested data
 * @throws {Error} TtyError if prompt could not be rendered in the environment
 */
export const requestMissingData = async (data: QuestionKey[]) => {
  const additionalQuestions = Object.entries(questions)
    .map(([questionKey, question]) => {
      return !data.includes(questionKey as QuestionKey) && question
    })
    .filter(Boolean) as Question[]

  return inquirer.prompt(additionalQuestions)
}
