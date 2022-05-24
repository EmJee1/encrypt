import fs from 'node:fs/promises'
import { readFileSafe, writeFileSafe } from '../filesystem'

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
      // @ts-expect-error
      return readFileSafe().catch(e => expect(e).toBeInstanceOf(TypeError))
    })

    it('should return contents of mock-file.txt', async () => {
      const fileContent = await readFileSafe('./src/__test__/mock-file.txt')
      expect(fileContent).toBe('Hello, mocked textfile!\n')
    })
  })

  describe('writeFileSafe', () => {
    it('should throw error if the file already exists', () => {
      expect.assertions(1)
      return writeFileSafe('./src/__test__/mock-file.txt', '').catch(e =>
        expect(e).toBeInstanceOf(TypeError)
      )
    })

    it('should throw error if either of the arguments is not a string', () => {
      expect.assertions(3)
      // @ts-expect-error
      writeFileSafe(undefined, '').catch(e =>
        expect(e).toBeInstanceOf(TypeError)
      )
      // @ts-expect-error
      writeFileSafe('', undefined).catch(e =>
        expect(e).toBeInstanceOf(TypeError)
      )
      // @ts-expect-error
      writeFileSafe(undefined, undefined).catch(e =>
        expect(e).toBeInstanceOf(TypeError)
      )
    })
  })
})
