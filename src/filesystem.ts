import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * @name readFileSafe
 * @summary reads a file in utf-8 encoding after checking the parameter type and if the file exists
 * @param {string} file the filename or path to the file
 * @returns {string} the contents of the file in utf-8 encoding
 * @throws {TypeError} string type required
 * @throws {TypeError} file needs to exist
 */
export const readFileSafe = async (file: string): Promise<string> => {
  if (typeof file !== 'string') {
    throw new TypeError(`File should be a string, received '${typeof file}'`)
  }

  const resolvedPath = path.resolve(file)

  try {
    await fs.access(resolvedPath)
  } catch (_) {
    throw new TypeError(`File ${resolvedPath} does not exist`)
  }

  return await fs.readFile(resolvedPath, 'utf-8')
}
