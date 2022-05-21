import { Command } from 'commander'
import { encryptAes } from './aes-encryption'
import { logJson } from './terminal'

const program = new Command()

program
  .name('encrypt')
  .description('CLI to encrypt and decrypt files and strings')
  .version('0.0.1')

program
  .command('encrypt-file')
  .description('Encrypt a file')
  .argument('<filepath>', 'path to the file to be encrypted')
  .argument('[encrypted-filename]', 'name of the encrypted file')
  .action((filepath: string, encryptedFilename?: string) => {
    console.log('Filepath:', filepath)
    console.log('Encrypted filename:', encryptedFilename)
  })

program
  .command('encrypt-string')
  .description('Encrypt a string')
  .argument('<string>', 'string to be encrypted')
  .action(stringToEncrypt => {
    const encrypted = encryptAes(stringToEncrypt)
    logJson(encrypted)
  })

program.parse()
