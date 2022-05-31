#!/usr/bin/env node

import { program } from 'commander'
import encryptFile from './commands/encrypt-file'
import encryptString from './commands/encrypt-string'
import decryptFile from './commands/decrypt-file'

program
  .name('encrypt')
  .description('CLI to encrypt and decrypt files and strings')
  .version('0.0.1')

program.addCommand(encryptFile)
program.addCommand(encryptString)
program.addCommand(decryptFile)

program.parse()
