import { Command, program } from 'commander'
import inquirer, { QuestionCollection } from 'inquirer'
import { extractErrorMessage, logJson } from '../terminal'
import { readFileSafe, writeFileSafe } from '../filesystem'
import { validateFileExists } from '../inquirer'
import { encryptAes } from '../aes-encryption'

interface EncryptFileOptions {
  path: string
  key?: string
  iv?: string
  output?: string
}

const questions: QuestionCollection = [
  {
    type: 'input',
    name: 'path',
    message: 'path to the file',
    validate: validateFileExists,
  },
  {
    type: 'input',
    name: 'key',
    message: 'private key, leave empty to generate secure key',
  },
  {
    type: 'input',
    name: 'iv',
    message: 'initialization vector, leave empty te generate',
  },
  {
    type: 'input',
    name: 'output',
    message: 'path to the output file, leave empty to print to stdout',
  },
]

const handleEncryptFile = async () => {
  const options = await inquirer.prompt<EncryptFileOptions>(questions)

  const fileContents = await readFileSafe(options.path)
  const encryptedPayload = encryptAes(fileContents)

  if (options.output) {
    await writeFileSafe(options.output, encryptedPayload.encrypted)
    logJson({ iv: encryptedPayload.iv, key: encryptedPayload.key })
    return
  }

  logJson(encryptedPayload)
}

const encryptFile = new Command('encrypt-file')
  .description('Encrypt a file')
  .action(async () => {
    try {
      await handleEncryptFile()
    } catch (err) {
      const errorMessage = extractErrorMessage(err)
      return program.error(errorMessage)
    }
  })

export default encryptFile
