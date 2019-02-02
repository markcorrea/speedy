import { version } from '../../package.json'
import { Router } from 'express'
import voiceService from './voiceService'

/* 
API calls
*/
export default ({ config, db }) => {
  let api = Router()

  /* Gets a list of voices ordered by recent first. */
  api.get('/voices', voiceService.getVoices)

  /* Generates a complete process from quote generation to database inclusion and renders a list on a browser. */
  api.get('/html', voiceService.accessHtml)

  return api
}
