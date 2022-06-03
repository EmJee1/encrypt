import { Question, registerPrompt } from 'inquirer'
import fuzzyPath, { FuzzyPathQuestionOptions } from 'inquirer-fuzzy-path'

registerPrompt('fuzzypath', fuzzyPath)

export const existingFileQuestion = (
  message: string
): FuzzyPathQuestionOptions => ({
  type: 'fuzzypath',
  itemType: 'file',
  name: 'path',
  message,
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
