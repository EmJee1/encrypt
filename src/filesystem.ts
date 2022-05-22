import fs from 'node:fs/promises'
import path from 'node:path'

export const readFileSafe = async (file: unknown): Promise<string> => {
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
