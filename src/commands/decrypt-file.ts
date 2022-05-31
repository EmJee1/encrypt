import { Command } from 'commander'
import { QuestionKey, requestMissingData } from '../inquirer'

export interface DecryptFileOptions {
  path: string
  key: string
  iv: string
}

const decryptFile = new Command('decrypt-file')
  .description('Decrypt a file')
  .option('-p, --path <path>', 'path to the file')
  .option('-k --key <key>', 'decryption key')
  .option('-i --iv <iv>', 'initialization vector')
  .action(async (data: Partial<DecryptFileOptions>) => {
    const missing = await requestMissingData(Object.keys(data) as QuestionKey[])
    const options = { ...data, ...missing }
  })

export default decryptFile
