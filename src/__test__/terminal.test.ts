import { extractErrorMessage } from '../terminal'

describe('terminal', () => {
  describe('extractErrorMessage', () => {
    it('should return the error message if value is an error', () => {
      expect(extractErrorMessage(new TypeError('type-error'))).toBe(
        'type-error'
      )
      expect(extractErrorMessage(new RangeError('range-error'))).toBe(
        'range-error'
      )
      expect(extractErrorMessage(new Error('error'))).toBe('error')
    })

    it('should return the string if value is a string', () => {
      expect(extractErrorMessage('string-error')).toBe('string-error')
    })

    it("should return 'unknown error' message if value is not an error or string", () => {
      expect(extractErrorMessage(undefined)).toBe('Unknown error occurred')
      expect(extractErrorMessage(null)).toBe('Unknown error occurred')
      expect(extractErrorMessage(0)).toBe('Unknown error occurred')
    })
  })
})
