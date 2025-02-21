import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import { uploadDocuments } from '../controllers/users.controller.js';
import upload from '../utils/uploader.js';

const router = Router();

// User routes
router.get('/', usersController.getAllUsers);
router.get('/:uid', usersController.getUser);
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);

// File upload route
router.post('/:uid/documents', upload.array('documents'), uploadDocuments);

export default router;
