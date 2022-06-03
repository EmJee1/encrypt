import { Question } from 'inquirer'
import { readFileSafe } from './filesystem'

export const existingFileQuestion = (message: string): Question => ({
  type: 'input',
  name: 'path',
  message,
  validate: validateFileExists,
})

export const keyQuestion = (message: string, required: boolean): Question => ({
  type: 'input',
  name: 'key',
  message,
  validate: validateKey(required),
})

export const ivQuestion = (message: string): Question => ({
  type: 'input',
  name: 'iv',
  message,
})

export const outputQuestion = (message: string): Question => ({
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

export const validateKey =
  (required: boolean) =>
  (input: string): boolean | string => {
    if (!required && input.length === 0) {
      return true
    }

    const byteLength = Buffer.byteLength(input, 'utf-8')

    if (byteLength !== 32) {
      return `The key should have a length of 32, instead got ${byteLength}`
    }

    return true
  }
