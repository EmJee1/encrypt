import { program } from 'commander'
import encryptFile from './commands/encrypt-file'
import encryptString from './commands/encrypt-string'

program
  .name('encrypt')
  .description('CLI to encrypt and decrypt files and strings')
  .version('0.0.1')

program.addCommand(encryptFile)
program.addCommand(encryptString)

program.parse()
