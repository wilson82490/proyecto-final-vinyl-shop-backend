import Vinilos from '../models/vinilos.js';
import Cart from '../models/cart.js';

export const getDashboardStats = async (req, res) => {
  try {
    const vinyls = await Vinilos.find();
    const carts = await Cart.find();

    const totalVinilos = vinyls.length;
    const featuredVinilos = vinyls.filter((vinyl) => vinyl.featured).length;
    const totalStock = vinyls.reduce((sum, vinyl) => sum + vinyl.stock, 0);
    const inventoryValue = vinyls.reduce(
      (sum, vinyl) => sum + vinyl.price * vinyl.stock,
      0
    );
    const lowStockVinilos = vinyls.filter((vinyl) => vinyl.stock < 5).length;
    const outOfStockVinilos = vinyls.filter((vinyl) => vinyl.stock === 0).length;

    const categoriesMap = vinyls.reduce((acc, vinyl) => {
      acc[vinyl.category] = (acc[vinyl.category] || 0) + 1;
      return acc;
    }, {});

    const categories = Object.entries(categoriesMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const activeCarts = carts.filter((cart) => cart.items.length > 0).length;
    const cartItemsTotal = carts.reduce(
      (sum, cart) =>
        sum + cart.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
      0
    );
    const cartRevenue = carts.reduce(
      (sum, cart) =>
        sum +
        cart.items.reduce(
          (itemSum, item) => itemSum + item.price * item.quantity,
          0
        ),
      0
    );

    const recentVinilos = [...vinyls]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((vinyl) => ({
        id: vinyl._id,
        name: vinyl.name,
        artist: vinyl.artist,
        category: vinyl.category,
        stock: vinyl.stock,
        price: vinyl.price,
        createdAt: vinyl.createdAt,
      }));

    return res.status(200).json({
      totalVinilos,
      featuredVinilos,
      totalStock,
      inventoryValue: Number(inventoryValue.toFixed(2)),
      lowStockVinilos,
      outOfStockVinilos,
      categories,
      activeCarts,
      cartItemsTotal,
      cartRevenue: Number(cartRevenue.toFixed(2)),
      recentVinilos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener estadísticas' });
  }
};
