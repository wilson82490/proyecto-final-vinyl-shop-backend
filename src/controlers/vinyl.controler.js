
import Vinilos from '../models/vinilos.js';

export const getVinyls = async (req, res) => {
  try{
    

   const vinyls = await Vinilos.find();
   res.json(vinyls);

  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error al obtener los vinilos'});
  }
}


export const getVinylsById = async (req, res) => {
    const {id} = req.params;

    try {
        const vinilo = await Vinilos.findById(id);
       /*  const vinilo = await Vinilos.findById().select("-description -__v"); */

        if(!vinilo){
            return res.status(404).json({message: 'Vinilo no encontrado'});
        }
        res.json(vinilo);
    } catch (error) {
       //console.log(error);
        res.status(500).json({message: 'Error al obtener el vinilo por ID'});
    }
}