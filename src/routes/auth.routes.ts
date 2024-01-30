import { Router } from 'express'
import { logger } from '../utils/logger'
import { loginAuth, refreshToken, logoutAuth } from '../controller/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/login', loginAuth, () => {
  logger.info('Success login ')
})

AuthRouter.get('/token', refreshToken, () => {
  logger.info('Success refresh token ')
})

AuthRouter.delete('/logout', logoutAuth, () => {
  logger.info('Success logut account ')
})
