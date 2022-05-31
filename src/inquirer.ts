import { readFileSafe } from './filesystem'

export const validateFileExists = async (
  input: string
): Promise<boolean | string> => {
  try {
    await readFileSafe(input)
    return true
  } catch (err) {
    return err instanceof Error
      ? err.message
      : 'Something went wrong when trying to access the file'
  }
}
