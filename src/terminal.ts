import colorizeJson from 'json-colorizer'

export const logJson = (json: Record<string, unknown>) => {
  const jsonString = JSON.stringify(json)
  const colorizedJson = colorizeJson(jsonString, { pretty: true })
  console.log(colorizedJson)
}
