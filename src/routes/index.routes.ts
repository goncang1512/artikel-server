import { Application, Router } from 'express'
import { UserRouter } from './user.routes'
import { ContentRouter } from './content.routes'
import { AuthRouter } from './auth.routes'
import { CommentRouter } from './comments.routes'
import { ReplayRouter } from './replay.routes'
import { MadingRouter } from './mading.routes'
import { LikesRoutes } from './likes.routes'

const _routes: Array<[string, Router]> = [
  ['/api', UserRouter],
  ['/api', ContentRouter],
  ['/api', AuthRouter],
  ['/api', CommentRouter],
  ['/api', ReplayRouter],
  ['/api', MadingRouter],
  ['/api', LikesRoutes]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
