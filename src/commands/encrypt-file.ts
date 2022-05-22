import path from 'node:path'
import fs from 'node:fs/promises'
import { Command, program } from 'commander'
import { encryptAes } from '../aes-encryption'
import { logJson } from '../terminal'
import { readFileSafe } from '../filesystem'

const handleEncryptFile = async (
  filepath: string,
  encryptedFilename?: string
) => {
  const fileContents = await readFileSafe(filepath)
  const encryptedPayload = encryptAes(fileContents)

  if (encryptedFilename) {
    const resolvedPathToWrite = path.resolve(encryptedFilename)
    await fs.writeFile(resolvedPathToWrite, encryptedPayload.encrypted, 'utf-8')
    logJson({ iv: encryptedPayload.iv, key: encryptedPayload.key })
    return
  }

  logJson(encryptedPayload)
}

const encryptFile = new Command('encrypt-file')
  .description('Encrypt a file')
  .argument('<filepath>', 'path to the file to be encrypted')
  .argument('[filepath]', 'path to the encrypted file')
  .action(async (filepath: string, encryptedFilename?: string) => {
    try {
      await handleEncryptFile(filepath, encryptedFilename)
    } catch (err) {
      // TODO: implement error logger handler
      return program.error('')
    }
  })

export default encryptFile
