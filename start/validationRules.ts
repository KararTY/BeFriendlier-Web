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
import PerspectiveAPI from '@ioc:Befriendlier-Shared/PerspectiveAPI'
import PerspectiveAPIConfig from '../config/perspective'

validator.rule('hexColorString', (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
  /**
   * Skip validation when value is not a string. The string
   * schema rule will handle it
   */
  if (typeof value !== 'string') {
    return
  }

  const hexColorStringValidator = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

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

  const validTwitchName = /^[\w]+$/

  if (value.match(validTwitchName) === null) {
    errorReporter.report(pointer, 'validTwitchName', 'Invalid Twitch name.', arrayExpressionPointer)
  }
})

validator.rule('nonToxicBio', async (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
  /**
   * Skip validation when value is not a string. The string
   * schema rule will handle it
   */
  if (typeof value !== 'string') {
    return
  }

  const check = await PerspectiveAPI.check(value)

  if (check === null) {
    errorReporter.report(
      pointer, 'nonToxicBio', 'Could not change your bio at this time. Try again later.', arrayExpressionPointer)
  } else if (check.attributeScores.TOXICITY.summaryScore.value > PerspectiveAPIConfig.thresholdTOXICITY) {
    errorReporter.report(pointer, 'nonToxicBio', 'Your bio is too toxic. Try again.', arrayExpressionPointer)
  }
}, () => { // Per: https://github.com/adonisjs/core/discussions/1333#discussioncomment-42239
  return {
    async: true
  }
})
