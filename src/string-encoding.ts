/**
 * @name convertUtf8ToHex
 * @summary converts an utf-8 string into a string with the hexadecimal format
 * @param {string} value utf-8 string
 * @returns {string} hexadecimal string
 */
export const convertUtf8ToHex = (value: string) => {
  return Buffer.from(value, 'utf-8').toString('hex')
}

/**
 * @name convertHexToUtf8
 * @summary converts a hexadecimal string into a string with the utf-8 format
 * @param {string} value
 * @returns {string} utf-8 string
 */
export const convertHexToUtf8 = (value: string) => {
  return Buffer.from(value, 'hex').toString('utf-8')
}
