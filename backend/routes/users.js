const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  getAuthorizedUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

const { checkUrlValidity } = require('../utils/utils');

router.get('/', getUsers);
router.get('/me', getAuthorizedUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(checkUrlValidity),
  }),
}), updateUserAvatar);

module.exports = router;
