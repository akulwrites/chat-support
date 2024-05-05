import express from 'express';
import * as chatController from '../controllers/chatController.js';

const router = express.Router();

router.get('/messages', chatController.getMessages);
router.post('/send', chatController.sendMessage);

export default router;
