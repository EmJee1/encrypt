import { Command, program } from 'commander'
import inquirer, { QuestionCollection } from 'inquirer'
import { readFileSafe, writeFileSafe } from '../filesystem'
import { extractErrorMessage, logJson } from '../terminal'
import { decryptAes } from '../aes-encryption'
import {
  existingFileQuestion,
  ivQuestion,
  keyQuestion,
  outputQuestion,
} from '../inquirer'
import { convertUtf8ToHex } from '../string-encoding'

interface DecryptFileOptions {
  path: string
  key: string
  iv: string
  output?: string
}

const questions: QuestionCollection = [
  existingFileQuestion('path to the file'),
  keyQuestion('private key', true),
  ivQuestion('initialization vector'),
  outputQuestion('path to the output file, leave empty to print to stdout'),
]

const handleDecryptFile = async () => {
  const options = await inquirer.prompt<DecryptFileOptions>(questions)

  const key = convertUtf8ToHex(options.key)

  const encrypted = await readFileSafe(options.path)
  const decrypted = decryptAes(encrypted, key, options.iv)

  if (!options.output) {
    logJson({ decrypted })
    return
  }

  await writeFileSafe(options.output, decrypted)
}

const decryptFile = new Command('decrypt-file')
  .description('Decrypt a file')
  .action(async () => {
    try {
      await handleDecryptFile()
    } catch (err) {
      const errorMessage = extractErrorMessage(err)
      return program.error(errorMessage)
    }
  })

export default decryptFile
