import path from 'node:path'
import fs from 'node:fs/promises'
import { Command } from 'commander'
import { encryptAes } from '../aes-encryption'
import { logJson } from '../terminal'

const encryptFile = new Command('encrypt-file')
  .description('Encrypt a file')
  .argument('<filepath>', 'path to the file to be encrypted')
  .argument('[filepath]', 'path to the encrypted file')
  .action(async (filepath: string, encryptedFilename?: string) => {
    const resolvedPath = path.resolve(filepath)
    const fileContents = await fs.readFile(resolvedPath, 'utf-8')
    const encrypted = encryptAes(fileContents)

    if (encryptedFilename) {
      const resolvedPathToWrite = path.resolve(encryptedFilename)
      await fs.writeFile(resolvedPathToWrite, encrypted.encrypted, 'utf-8')
      logJson({ iv: encrypted.iv, key: encrypted.key })
      return
    }

    logJson(encrypted)
  })

export default encryptFile
