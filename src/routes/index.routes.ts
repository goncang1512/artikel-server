import { Application, Router } from 'express'
import { UserRouter } from './user.routes'
import { ContentRouter } from './content.routes'
import { AuthRouter } from './auth.routes'
import { CommentRouter } from './comments.routes'
import { ReplayRouter } from './replay.routes'

const _routes: Array<[string, Router]> = [
  ['/api', UserRouter],
  ['/api', ContentRouter],
  ['/api', AuthRouter],
  ['/api', CommentRouter],
  ['/api', ReplayRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
