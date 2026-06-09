import Cart from '../models/cart.js';
import Vinilos from '../models/vinilos.js';

const getSessionId = (req) =>
  req.headers["x-session-id"] || req.body?.sessionId || req.query?.sessionId;

const formatCart = (cart) => ({
  sessionId: cart.sessionId,
  items: cart.items,
  itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  total: cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  updatedAt: cart.updatedAt,
});

const getOrCreateCart = async (sessionId) => {
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = await Cart.create({ sessionId, items: [] });
  }
  return cart;
};

export const getCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId es obligatorio' });
    }

    const cart = await getOrCreateCart(sessionId);
    return res.status(200).json(formatCart(cart));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { vinylId, quantity = 1 } = req.body;
    const parsedQuantity = Number(quantity);

    if (!sessionId || !vinylId) {
      return res
        .status(400)
        .json({ message: "sessionId y vinylId son obligatorios" });
    }

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      return res
        .status(422)
        .json({ message: "La cantidad debe ser un entero mayor a 0" });
    }

    const vinyl = await Vinilos.findById(vinylId);
    if (!vinyl) {
      return res.status(404).json({ message: 'Vinilo no encontrado' });
    }

    if (vinyl.stock <= 0) {
      return res.status(422).json({ message: 'Sin stock disponible' });
    }

    const cart = await getOrCreateCart(sessionId);
    const existingItem = cart.items.find(
      (item) => item.vinylId.toString() === vinylId
    );
    const newQuantity = (existingItem?.quantity || 0) + parsedQuantity;

    if (newQuantity > vinyl.stock) {
      return res.status(422).json({
        message: `Solo hay ${vinyl.stock} unidades disponibles`,
      });
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
      existingItem.price = vinyl.price;
      existingItem.stock = vinyl.stock;
    } else {
      cart.items.push({
        vinylId: vinyl._id,
        quantity: parsedQuantity,
        name: vinyl.name,
        artist: vinyl.artist,
        price: vinyl.price,
        image: vinyl.image,
        stock: vinyl.stock,
      });
    }

    await cart.save();
    return res.status(200).json(formatCart(cart));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { vinylId } = req.params;
    const { quantity } = req.body;
    const parsedQuantity = Number(quantity);

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId es obligatorio" });
    }

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      return res
        .status(422)
        .json({ message: "La cantidad debe ser un entero mayor a 0" });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const item = cart.items.find((entry) => entry.vinylId.toString() === vinylId);
    if (!item) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    const vinyl = await Vinilos.findById(vinylId);
    if (!vinyl) {
      return res.status(404).json({ message: 'Vinilo no encontrado' });
    }

    if (parsedQuantity > vinyl.stock) {
      return res.status(422).json({
        message: `Solo hay ${vinyl.stock} unidades disponibles`,
      });
    }

    item.quantity = parsedQuantity;
    item.price = vinyl.price;
    item.stock = vinyl.stock;
    await cart.save();

    return res.status(200).json(formatCart(cart));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { vinylId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId es obligatorio' });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.items = cart.items.filter((item) => item.vinylId.toString() !== vinylId);
    await cart.save();

    return res.status(200).json(formatCart(cart));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar del carrito' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);

    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId es obligatorio' });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(200).json({
        sessionId,
        items: [],
        itemCount: 0,
        total: 0,
      });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json(formatCart(cart));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al vaciar el carrito' });
  }
};
