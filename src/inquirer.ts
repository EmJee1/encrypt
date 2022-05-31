import { Question } from 'inquirer'
import { readFileSafe } from './filesystem'

type QuestionGenerator = (message: string) => Question

export const existingFileQuestion: QuestionGenerator = message => ({
  type: 'input',
  name: 'path',
  message,
  validate: validateFileExists,
})

export const keyQuestion: QuestionGenerator = message => ({
  type: 'input',
  name: 'key',
  message,
})

export const ivQuestion: QuestionGenerator = message => ({
  type: 'input',
  name: 'iv',
  message,
})

export const outputQuestion: QuestionGenerator = message => ({
  type: 'input',
  name: 'output',
  message,
})

export const validateFileExists = async (
  input: string
): Promise<boolean | string> => {
  try {
    await readFileSafe(input)
    return true
  } catch (err) {
    return err instanceof Error
      ? err.message
      : 'Something went wrong when trying to access the file'
  }
}
