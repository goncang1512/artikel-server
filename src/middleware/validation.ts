import Joi from 'joi'
import { logger } from '../utils/logger'
import { NextFunction, Request, Response } from 'express'
import { LoginType } from '../utils/DataTypes.type'

export const createContentValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required().max(50).empty(''),
    description: Joi.string().required().max(50).empty('')
  })

  const { error } = schema.validate(req.body)
  if (error) {
    let message: string = ''
    switch (error.details[0].type) {
      case 'any.required':
        message = 'Semua data harus di isi'
        break
      case 'string.max':
        message = 'Title tidak boleh lebih 50 char'
        break
      case 'number.base':
        message = 'Umur harus menggunakan angka'
        break
    }

    logger.error(`ERR: content - create = ${error.details[0].message}`)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      result: {},
      message
    })
  }

  next()
}

export const updateContentValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required().max(50).empty(''),
    description: Joi.string().required().max(50).empty(''),
    imgPoster: Joi.allow()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    let message: string = ''
    switch (error.details[0].type) {
      case 'any.required':
        message = 'Semua data harus di isi'
        break
      case 'string.max':
        message = 'Title tidak boleh lebih 50 char'
        break
      case 'number.base':
        message = 'Umur harus menggunakan angka'
        break
    }

    logger.error(`ERR: content - create = ${error.details[0].message}`)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      result: {},
      message
    })
  }

  next()
}

export const createUserValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    username: Joi.string().max(15).required().empty(''),
    email: Joi.string().required().empty(''),
    password: Joi.string().required().empty(''),
    confPassword: Joi.string().required().empty(''),
    imgProfil: Joi.allow()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    let message: string = ''
    switch (error.details[0].type) {
      case 'any.required':
        message = 'Semua data harus di isi'
        break
      case 'string.max':
        message = 'Title tidak boleh lebih 50 char'
        break
    }

    logger.error(`ERR: user - create = ${error.details[0].message}`)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      result: {},
      message
    })
  }

  next()
}

export const updateValidateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    username: Joi.string().max(15).required().empty(''),
    email: Joi.string().required().empty(''),
    password: Joi.string().allow().empty(''),
    confPassword: Joi.string().allow().empty(''),
    imgProfil: Joi.allow()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    let message: string = ''
    switch (error.details[0].type) {
      case 'any.required':
        message = 'Semua data harus di isi'
        break
      case 'string.max':
        message = 'Username tidak boleh lebih 50 char'
        break
    }

    logger.error(`ERR: user - create = ${error.details[0].message}`)
    return res.status(422).json({
      status: false,
      statusCode: 422,
      result: {},
      message
    })
  }

  next()
}

export const loginValidation = (payload: LoginType) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })

  const { error, value } = schema.validate(payload)
  if (error) {
    let message: string = ''
    switch (error?.details[0].type) {
      case 'string.empty':
        message = 'Semua data harus di isi'
        break
      case 'string.base':
        message = 'Harus bernilai string'
        break
      case 'string.email':
        message = 'Anda harus memasukkan email'
        break
    }
    return { message, from: 'Joi' }
  } else {
    return value
  }
}
