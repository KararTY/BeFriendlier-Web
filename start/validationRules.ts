/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('hexColorString', (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
  /**
   * Skip validation when value is not a string. The string
   * schema rule will handle it
   */
  if (typeof value !== 'string') {
    return
  }

  const hexColorStringValidator = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)

  if (value.match(hexColorStringValidator) === null) {
    errorReporter.report(pointer, 'hexColorString', 'Invalid hex color string.', arrayExpressionPointer)
  }
})

validator.rule('validTwitchName', (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
  /**
   * Skip validation when value is not a string. The string
   * schema rule will handle it
   */
  if (typeof value !== 'string') {
    return
  }

  const validTwitchName = new RegExp(/^[\w]+$/)

  if (value.match(validTwitchName) === null) {
    errorReporter.report(pointer, 'validTwitchName', 'Invalid Twitch name.', arrayExpressionPointer)
  }
})
