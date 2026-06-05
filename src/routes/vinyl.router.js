import { Router } from 'express';

import { getVinyls } from '../controlers/vinyl.controler.js';
import { getVinylsById } from '../controlers/vinyl.controler.js';


const router = Router();




//prefijo: /api/vinyls

router.get('/', getVinyls);
router.get('/:id', getVinylsById);

export default router;


