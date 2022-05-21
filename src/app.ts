import { Command } from 'commander'

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

program.parse()
