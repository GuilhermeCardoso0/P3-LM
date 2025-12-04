import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validate } from '../middlewares/validate';
import Joi from 'joi';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorize';

const router = Router();

const createSchema = Joi.object({ name: Joi.string().min(3).required(), email: Joi.string().email().required(), role: Joi.string().valid('admin','manager','user').required(), password: Joi.string().min(6) });
const updateSchema = Joi.object({ name: Joi.string().min(3), email: Joi.string().email(), role: Joi.string().valid('admin','manager','user') });

router.get('/', UserController.list);
router.get('/:id', UserController.get);
router.post('/', validate(createSchema), UserController.create);
router.put('/:id', validate(updateSchema), UserController.update);
// protect delete: must be authenticated and admin
router.delete('/:id', authMiddleware, authorize(['admin']), UserController.delete);

export default router;
