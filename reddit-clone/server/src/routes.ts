import * as users from './controllers/users'
import * as posts from './controllers/posts'
import * as comments from './controllers/comments'
import { jwtAuth, postAuth, commentAuth } from './auth'
import Router from 'express'

const router = Router()

// @ts-ignore
router.post('/login', users.validate(), users.login)
router.post('/register', users.validate('register'), users.register)

router.param('post', posts.load)
router.get('/posts', posts.list)
router.get('/posts/:category', posts.listByCategory)
router.get('/post/:post', posts.show)
// @ts-ignore
router.post('/posts', [jwtAuth, posts.validate], posts.create)
router.delete('/post/:post', [jwtAuth, postAuth], posts.destroy)
router.get('/post/:post/upvote', jwtAuth, posts.upvote)
router.get('/post/:post/downvote', jwtAuth, posts.downvote)
router.get('/post/:post/unvote', jwtAuth, posts.unvote)
router.get('/user/:user', posts.listByUser)

router.param('comment', comments.load)
// @ts-ignore
router.post('/post/:post', [jwtAuth, comments.validate], comments.create)
router.delete('/post/:post/:comment', [jwtAuth, commentAuth], comments.destroy)

export default (app) => {
  app.use('/api', router)

  app.get('*', (req, res) => {
    res.status(404).json({ message: 'not found' })
  })

  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ message: 'bad request' })
    }
    next(err)
  })
}
