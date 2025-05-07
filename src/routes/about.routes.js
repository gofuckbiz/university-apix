
import { Router } from 'express';
import { getAboutInfo, updateAboutInfo } from '../controllers/controllers.js';

const router = Router();

router.get('/', getAboutInfo); 
router.put('/', updateAboutInfo); 

export default router;