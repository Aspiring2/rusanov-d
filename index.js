import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'

import {
	registerValidation,
	loginValidation,
	postCreateValidation, 
	ServiceCreateValidation,
	commentCreateValidation
} from './validations/auth.js'

import { UserController, PostController, ServiceController, CommentPostController, CommentServiceController } from './controllers/index.js'

import { checkAuth, handleValidationErrors } from './utils/index.js'

import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
const password = process.env.PASSWORD;



mongoose
	.connect(password)
	.then(() => console.log('DB connected'))
	.catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())

app.get('/', (req, res) => {})
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);

app.post(
	'/auth/register',
	registerValidation,
	handleValidationErrors,
	UserController.register
)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})


app.get('/tags', PostController.getLastTags)
app.get('/tags', ServiceController.getLastTags)
/* --------------- POSTS ---------------*/
app.post('/posts', checkAuth,	postCreateValidation, handleValidationErrors,	PostController.create)
app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update)
app.delete(	'/posts/:id',	checkAuth,	handleValidationErrors,	PostController.remove)

/* --------------- COMMENTS --------------- */
app.post('/posts/:postId/comments', checkAuth, commentCreateValidation, CommentPostController.createComment);
app.get('/posts/:postId/comments', CommentPostController.getCommentsByPostId);
app.delete('/comments/:commentId', checkAuth, CommentPostController.deleteComment);
app.post('/services/:serviceId/comments', checkAuth, commentCreateValidation, CommentServiceController.createComment);
app.get('/services/:serviceId/comments', CommentServiceController.getCommentsByServiceId);


/* --------------- SERVICES ---------------*/
app.post('/services', checkAuth, ServiceCreateValidation, handleValidationErrors, ServiceController.create)
app.get('/services', ServiceController.getAll)
app.get('/services/tags', ServiceController.getLastTags)
app.get('/services/:id', ServiceController.getOne)
app.patch('/services/:id', checkAuth, ServiceCreateValidation, ServiceController.update)
app.delete(	'/services/:id',	checkAuth,	handleValidationErrors,	ServiceController.remove)

app.listen(4444, (err) => {
	if (err) {
		return console.log(err)
	}
	console.log('Sererver started')
})
