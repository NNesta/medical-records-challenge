import { Router } from 'express';
import Authentication from '../controller/auth.js';
import MedicalController from '../controller/index.js';
import Users from '../controller/users.js';

const { FetchData } = MedicalController;
const { Login, Signup } = Authentication;
const { getUser, getUsers } = Users;

const router = Router();

router.get('/:id', FetchData);
router.post('/auth/users/signup', Signup);
router.get('/users/single/:email', getUser);
router.get('/users/all', getUsers);
router.post('/auth/user/login', Login);

export default router;
