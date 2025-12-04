import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import Joi from 'joi';
import { validate } from '../middlewares/validate';

const router = Router();

const registerSchema = Joi.object({ name: Joi.string().min(3).required(), email: Joi.string().email().required(), password: Joi.string().min(6).required(), role: Joi.string().valid('admin','manager','user').required() });
const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);

export default router;
