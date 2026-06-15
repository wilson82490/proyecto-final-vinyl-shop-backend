import Vinilos from "../models/vinilos.js";

// Crear un nuevo vinilo
export const createVinyl = async (req, res) => {
  try {
    const {
      name,
      artist,
      description,
      price,
      category,
      image,
      label,
      year,
      format,
      stock,
      featured,
    } = req.body;

    // Validación básica
    if (!name || !artist || !year || !category || price == null) {
      return res.status(422).json({
        message: "Faltan campos obligatorios",
      });
    }

    const vinyl = await Vinilos.create(req.body);

    return res.status(201).json(vinyl);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al crear la vinilo" });
  }
};

// Obtener todos los vinilos
export const getVinyls = async (req, res) => {
  try {
    const vinyls = await Vinilos.find();

    return res.status(200).json(vinyls);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener los vinilos",
    });
  }
};

// Obtener un vinilo por ID
export const getVinylById = async (req, res) => {
  const { id } = req.params;

  try {
    const vinyl = await Vinilos.findById(id);

    if (!vinyl) {
      return res.status(404).json({
        message: "Vinilo no encontrado",
      });
    }

    return res.status(200).json(vinyl);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener el vinilo por ID",
    });
  }
};

export const updateVinyl = async (req, res) => {
  try {
    const { id } = req.params;

    const vinyl = await Vinilos.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!vinyl) {
      return res.status(404).json({ message: "Vinilo no encontrado" });
    }

    res.json(vinyl);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al actualizar el vinilo" });
  }
};

export const deleteVinyl = async (req, res) => {
  try {
    const { id } = req.params;
    const vinyl = await Vinilos.findByIdAndDelete(id);

    if (!vinyl) {
      return res.status(404).json({ message: "Vinilo no encontrado" });
    }

    res.json({ message: "Vinilo borrado" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Error al borrar el vinilo" });
  }
};
