import { Router } from 'express';
import Vinilos from '../models/vinilos.js';

const router = Router();




//prefijo: /api/vinyls

router.get('/', async (req, res) => {
  try{
    /* res.json({message: 'Obtener todos los vinilos'}); */

   const vinyls = await Vinilos.find();
   res.json(vinyls);

  } catch (error) {
    res.status(500).json({message: 'Error al obtener los vinilos'});
  }
});

export default router;