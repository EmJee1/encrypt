import { Command, program } from 'commander'
import inquirer, { QuestionCollection } from 'inquirer'
import { extractErrorMessage, logJson } from '../terminal'
import { readFileSafe, writeFileSafe } from '../filesystem'
import { existingFileQuestion, keyQuestion, outputQuestion } from '../inquirer'
import { encryptAes, generatePrivateKey } from '../aes-encryption'
import { convertUtf8ToHex } from '../string-encoding'

interface EncryptFileOptions {
  path: string
  key: string
  output?: string
}

const questions: QuestionCollection = [
  existingFileQuestion('path to the file'),
  keyQuestion('private key, leave empty to generate', false),
  outputQuestion('path to the output file, leave empty to print to stdout'),
]

const handleEncryptFile = async () => {
  const options = await inquirer.prompt<EncryptFileOptions>(questions)

  const key = options.key ? convertUtf8ToHex(options.key) : generatePrivateKey()

  const fileContents = await readFileSafe(options.path)
  const encryptedPayload = encryptAes(fileContents, key)

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
