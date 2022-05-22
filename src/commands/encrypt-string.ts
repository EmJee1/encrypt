import { Command } from 'commander'
import { encryptAes } from '../aes-encryption'
import { logJson } from '../terminal'

const encryptString = new Command('encrypt-string')
  .description('Encrypt a string')
  .argument('<string>', 'string to be encrypted')
  .action(stringToEncrypt => {
    const encrypted = encryptAes(stringToEncrypt)
    logJson(encrypted)
  })

export default encryptString
