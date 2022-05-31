import { Command, program } from 'commander'
import { QuestionKey, requestMissingData } from '../inquirer'
import { readFileSafe, writeFileSafe } from '../filesystem'
import { extractErrorMessage, logJson } from '../terminal'
import { decryptAes } from '../aes-encryption'

export interface DecryptFileOptions {
  path: string
  key: string
  iv: string
  output?: string
}

const handleDecryptFile = async (data: Partial<DecryptFileOptions>) => {
  const missing = await requestMissingData(Object.keys(data) as QuestionKey[])
  const options = { ...data, ...missing } as DecryptFileOptions

  const encrypted = await readFileSafe(options.path)
  const decrypted = decryptAes(encrypted, options.key, options.iv)

  if (!options.output) {
    logJson({ decrypted })
    return
  }

  await writeFileSafe(options.output, decrypted)
}

const decryptFile = new Command('decrypt-file')
  .description('Decrypt a file')
  .option('-p, --path <path>', 'path to the file')
  .option('-k --key <key>', 'decryption key')
  .option('-i --iv <iv>', 'initialization vector')
  .option('-o --output <path>', 'path to encrypted file')
  .action(async (data: Partial<DecryptFileOptions>) => {
    try {
      await handleDecryptFile(data)
    } catch (err) {
      const errorMessage = extractErrorMessage(err)
      return program.error(errorMessage)
    }
  })

export default decryptFile
