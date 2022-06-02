import crypto from 'node:crypto'

const AES_ALGORITHM = 'aes-256-cbc'

// use type instead of interface, so it is assignable to an index signature of 'string'
// https://github.com/microsoft/TypeScript/issues/15300#issuecomment-332366024
export type AesEncryptedPayload = {
  /**
   * Encrypted string in hex encoding
   */
  encrypted: string
  /**
   * Private key for decoding in hex encoding
   */
  key: string
  /**
   * Iv (initialization vector) in hex encoding
   * https://en.wikipedia.org/wiki/Initialization_vector
   */
  iv: string
}

/**
 * @name encryptAes
 * @summary encrypts a string in AES format
 * @param {string} input the string to be encrypted
 * @returns {AesEncryptedPayload} object containing the encrypted string, key and iv
 * @throws {TypeError} string type required
 */
export const encryptAes = (input: string): AesEncryptedPayload => {
  if (typeof input !== 'string') {
    throw new TypeError("Content to encrypt should be of type 'string'")
  }

  const cipherKey = crypto.randomBytes(32)
  const cipherIv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(AES_ALGORITHM, cipherKey, cipherIv)
  const encryptedBufferPartial = cipher.update(input)
  const encryptedBuffer = Buffer.concat([
    encryptedBufferPartial,
    cipher.final(),
  ])

  const encryptedString = encryptedBuffer.toString('hex')
  const keyString = cipherKey.toString('hex')
  const ivString = cipherIv.toString('hex')

  return {
    encrypted: encryptedString,
    key: keyString,
    iv: ivString,
  }
}

/**
 * @name decryptAes
 * @summary decrypts an AES-encrypted string
 * @param {string} encryptedString the encrypted string
 * @param {string} keyString the key string
 * @param {string} ivString the iv string
 * @returns {string} the decrypted string
 */
export const decryptAes = (
  encryptedString: string,
  keyString: string,
  ivString: string
): string => {
  if (
    typeof encryptedString !== 'string' ||
    typeof keyString !== 'string' ||
    typeof ivString !== 'string'
  ) {
    throw new TypeError(
      "Encrypted, key and iv arguments should be of type 'string'"
    )
  }

  const encryptedBuffer = Buffer.from(encryptedString, 'hex')
  const cipherKey = Buffer.from(keyString, 'hex')
  const cipherIv = Buffer.from(ivString, 'hex')

  const decipher = crypto.createDecipheriv(AES_ALGORITHM, cipherKey, cipherIv)
  const decryptedBufferPartial = decipher.update(encryptedBuffer)
  const decryptedBuffer = Buffer.concat([
    decryptedBufferPartial,
    decipher.final(),
  ])

  return decryptedBuffer.toString()
}
