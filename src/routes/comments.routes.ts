import { Router } from 'express'
import { logger } from '../utils/logger'
import { deleteComment, getComment, getCommentContent, postComment } from '../controller/comments.controller'

export const CommentRouter: Router = Router()

CommentRouter.post('/comments/:userId/:contentId', postComment, () => {
  logger.info('Success post comment')
})

CommentRouter.get('/comments', getComment, () => {
  logger.info('Success get comment')
})

CommentRouter.get('/comments/:contentId', getCommentContent, () => {
  logger.info('Success get comment content')
})

CommentRouter.delete('/comments/:id', deleteComment, () => {
  logger.info('Success delete comment')
})
