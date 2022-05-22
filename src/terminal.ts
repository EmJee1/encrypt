import colorizeJson from 'json-colorizer'

export const logJson = (json: Record<string, unknown>) => {
  const jsonString = JSON.stringify(json)
  const colorizedJson = colorizeJson(jsonString, { pretty: true })
  console.log(colorizedJson)
}

export const extractErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Unknown error occurred'
}
