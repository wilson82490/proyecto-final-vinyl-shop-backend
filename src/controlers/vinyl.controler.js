import Vinilos from "../models/vinilos.js";

// Crear un nuevo vinilo
export const createVinyl = async (req, res) => {
  try {
    const {
      title,
      artist,
      year,
      genre,
      image
    } = req.body;

    // Validación básica
    if (!title || title.trim() === "" || title.length < 3) {
      return res.status(422).json({
        message: "El titulo es obligatorio y debe tener al menos 3 caracteres",
      });
    }


    if (!title || !artist || !year || !genre) {
      return res.status(422).json({
        message: "Faltan campos obligatorios",
      });
    }

   if (!title || !genre || !year || !image) {
      return res
        .status(422)
        .json({ message: "Todos los campos son obligatorios" });
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




export const updateVinyl = async (req,res)=>{
try {
    const{id} = req.params;
    if (typeof req.body.title != "string"){
        return res
        .status(422)
        .json({message: "El titulo tiene que set un texto"})
    }
    const vinyl = await Vinilos.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true

    })
    res.json(vinyl)
} catch (error) {
    //console.log(error)

    if(error.name === "CastError"){
        return res.status(404).json({message: error.message});
    }

    res.status(500).json({message: "Error al actualizar el vinilo"})
}
};


export const deleteVinyl = async (req, res)=>{
    try {
        const {id} = req.params;
        const vinyl = await Vinilos.findByIdAndDelete(id);

        if(!vinyl){
            return res.status(404).json({message: "Vinilo no encontrado"})
        }

        res.json({message: "Vinilo borrdoo"})
    } catch (error) {
        res.status(500).json({message: "Error al borrar el vinilo"})
    }
}
/* import mongoose from "mongoose";
import Vinilos from "../models/vinilos.js";

// Crear un nuevo vinilo
export const createVinyl = async (req, res) => {
  try {
    const { title, artist, year, genre } = req.body;

    // Validación básica
    if (!title || !artist || !year || !genre) {
      return res.status(422).json({
        message: "Faltan campos obligatorios",
      });
    }

    const vinyl = await Vinilos.create(req.body);

    return res.status(201).json(vinyl);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear el vinilo",
    });
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
  try {
    const { id } = req.params;

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

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
      message: "Error al obtener el vinilo",
    });
  }
}; */