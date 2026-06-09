import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cart.controller.js';

const router = Router();

router.get('/', getCart);
router.post('/items', addToCart);
router.put('/items/:vinylId', updateCartItem);
router.delete('/items/:vinylId', removeFromCart);
router.delete('/', clearCart);

export default router;
