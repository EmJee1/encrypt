import { convertHexToUtf8, convertUtf8ToHex } from '../string-encoding'

describe('string-encoding', () => {
  describe('Convert utf-8 to hex', () => {
    it('should return a  truthy value', () => {
      expect(convertUtf8ToHex('input')).toBeTruthy()
    })

    it('should decode valid string', () => {
      const expectedValue = '696e707574'
      const utf8String = convertHexToUtf8(expectedValue)
      expect(convertUtf8ToHex(utf8String)).toBe(expectedValue)
    })
  })

  describe('Convert hex to utf-8', () => {
    it('should return a truthy value', () => {
      expect(convertHexToUtf8('696e707574')).toBeTruthy()
    })

    it('should decode valid string', () => {
      const expectedValue = 'input'
      const hexString = convertUtf8ToHex(expectedValue)
      expect(convertHexToUtf8(hexString)).toBe(expectedValue)
    })
  })
})
