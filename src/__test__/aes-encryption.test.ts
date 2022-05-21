import { AesEncryptedPayload, decryptAes, encryptAes } from '../aes-encryption'

describe('aes', () => {
  describe('encrypt', () => {
    it('should return a truthy iv and encrypted message', () => {
      const encrypted = encryptAes('input')
      expect(encrypted.encrypted).toBeTruthy()
      expect(encrypted.key).toBeTruthy()
      expect(encrypted.iv).toBeTruthy()
    })

    it('input string should be different from the output', () => {
      expect(encryptAes('input')).not.toEqual('input')
    })

    it('should throw error if no argument is passed', () => {
      expect(encryptAes).toThrow(TypeError)
    })
  })

  describe('decrypt', () => {
    let encrypted: AesEncryptedPayload
    beforeAll(() => {
      encrypted = encryptAes('input')
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
})
