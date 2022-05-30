import { Command, program } from 'commander'
import { encryptAes } from '../aes-encryption'
import { extractErrorMessage, logJson } from '../terminal'
import { readFileSafe, writeFileSafe } from '../filesystem'

const handleEncryptFile = async (
  filepath: string,
  encryptedFilename?: string
) => {
  const fileContents = await readFileSafe(filepath)
  const encryptedPayload = encryptAes(fileContents)

  if (encryptedFilename) {
    await writeFileSafe(encryptedFilename, encryptedPayload.encrypted)
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
      const errorMessage = extractErrorMessage(err)
      return program.error(errorMessage)
    }
  })

export default encryptFile
