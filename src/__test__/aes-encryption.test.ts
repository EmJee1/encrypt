import {
  AesEncryptedPayload,
  decryptAes,
  encryptAes,
  generatePrivateKey,
} from '../aes-encryption'

const expectValidEncryptedObject = (encrypted: AesEncryptedPayload) => {
  expect(encrypted.encrypted).toBeTruthy()
  expect(encrypted.key).toBeTruthy()
  expect(encrypted.iv).toBeTruthy()
}

describe('aes', () => {
  describe('encrypt', () => {
    it('should return a valid encrypted object with custom private key', () => {
      const encrypted = encryptAes('input', generatePrivateKey())
      expectValidEncryptedObject(encrypted)
    })

    it('input string should be different from the output', () => {
      const { encrypted } = encryptAes('input', generatePrivateKey())
      expect(encrypted).not.toEqual('input')
    })

    it('should throw error if no argument is passed', () => {
      expect(encryptAes).toThrow(TypeError)
    })
  })

  describe('decrypt', () => {
    let encrypted: AesEncryptedPayload
    beforeAll(() => {
      encrypted = encryptAes('input', generatePrivateKey())
    })

    it('should return a truthy message', () => {
      expect(
        decryptAes(encrypted.encrypted, encrypted.key, encrypted.iv)
      ).toBeTruthy()
    })

    it('should return the raw unencrypted message', () => {
      expect(decryptAes(encrypted.encrypted, encrypted.key, encrypted.iv)).toBe(
        'input'
      )
    })

    it('should throw error if one of the arguments is not passed', () => {
      expect(decryptAes).toThrow(TypeError)
      // @ts-expect-error
      expect(() => decryptAes(encrypted.encrypted)).toThrow(TypeError)
      // @ts-expect-error
      expect(() => decryptAes(undefined, encrypted.key)).toThrow(TypeError)
      // @ts-expect-error
      expect(() => decryptAes(undefined, undefined, encrypted.iv)).toThrow(
        TypeError
      )
    })
  })

  describe('generate private key', () => {
    it('should return a key in hex-string format', () => {
      expect(generatePrivateKey()).toBeTruthy()
      expect(generatePrivateKey().length).toBe(64)
    })
  })
})
