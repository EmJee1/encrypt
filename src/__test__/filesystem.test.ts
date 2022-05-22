import fs from 'node:fs/promises'
import { readFileSafe } from '../filesystem'

jest.mock('fs')

describe('filesystem', () => {
  describe('readFileSafe', () => {
    it('should throw error if the file does not exist', () => {
      expect.assertions(1)
      return readFileSafe('not.existing.file').catch(e =>
        expect(e).toBeInstanceOf(TypeError)
      )
    })

    it('should throw error if the input is not a string', () => {
      expect.assertions(1)
      // @ts-ignore
      return readFileSafe().catch(e => expect(e).toBeInstanceOf(TypeError))
    })

    it('should return contents of mock-file.txt', async () => {
      const fileContent = await readFileSafe('./src/__test__/mock-file.txt')
      expect(fileContent).toBe('Hello, mocked textfile!\n')
    })
  })
})
