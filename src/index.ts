import express, { Application, Request, Response, NextFunction } from 'express'

const app: Application = express()
const port: number = 3006

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'hello world' })
})

app.listen(port, () => {
  console.log(`Server berjalan di localhost:${port}`)
})
