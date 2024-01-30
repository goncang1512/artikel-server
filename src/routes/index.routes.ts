import { Application, Router } from 'express'
import { UserRouter } from './user.routes'
import { ContentRouter } from './content.routes'

const _routes: Array<[string, Router]> = [
  ['/api', UserRouter],
  ['/api', ContentRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
