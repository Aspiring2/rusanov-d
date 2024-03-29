import { body } from 'express-validator'

export const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),	
]

export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('fullName', 'Укажите имя').isLength({ min: 3 }),
	body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]

export const postCreateValidation = [
	body('title', 'Введите заголовок сервиса').isLength({ min: 3 }),
	body('text', 'Введите текст сервиса').isLength({ min: 3 }),
	body('tags', 'Неверный формат тегов (укажите массив)').isString().notEmpty(),
	body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]

export const commentCreateValidation = [
	body('text', 'Введите текст комментария').isLength({ min: 1 }),
  ];

export const ServiceCreateValidation = [
	body('title', 'Введите заголовок сервиса').isLength({ min: 3 }),
	body('text', 'Введите текст сервиса').isLength({ min: 3 }),
	body('tags', 'Неверный формат тегов').isString().notEmpty(),
	body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
