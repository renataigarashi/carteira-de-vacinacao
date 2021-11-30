const Vaccine = require("../models/Vaccines");

// const errorMsg = (res,error) => {
//     res.status(500).send({ message: error.message})
// }

const createVaccine = async(req, res) => {
    const { name, expected_date, vaccinated} = req.body;
    try{
        const vaccine = await Vaccine.create({ name, expected_date, vaccinated});
        console.log(`Vacina ${vaccine.name} cadastrada com sucesso`);
        res.status(200).send(vaccine);
    } catch(error) {
        res.status(500).send({ message: error.message})
    }
}

const getAllVaccine = async (req, res) => {
    try{
        const vaccine = await Vaccine.findAll(
            {
               order:[['id', 'DESC']]
            });
            (vaccine && vaccine.length > 0) ? res.status(200).send(vaccine) : res.status(204).send;
 
    } catch(error){
        res.status(500).send({ message: error.message})
    }
}

const getVaccineById = async (req, res) => {
    const vaccineId = req.params.id;
    try{
        const vaccine = await Vaccine.findOne(
            {
                where: { id: vaccineId }
            });
         (vaccine) ? res.status(200).send(vaccine) : res.status(404).send({ message: `Vacina de id ${vaccineId} não encontrado` })
    }catch(error){
        res.status(500).send({ message: error.message})
    }
}

const updateVaccinated = async (req, res) => {
    const vaccineId = req.params.id;
    const vaccinated = req.body.vaccinated;
    try{
        const rowUpdated = await Vaccine.update({vaccinated},
            {where: { id: vaccineId }}
        );
        (rowUpdated && rowUpdated > 0) 
        ? res.status(200).send({ message: `${rowUpdated[0]} vacina atualizada com sucesso`})
        : res.status(404).send({message: `${rowUpdated[0]} vacinas atualizadas. Vacina de ID ${vaccineId} não encontrado`})
    } catch(error){
        res.status(500).send({ message: error.message})
    }
}

module.exports = {
    createVaccine,
    getAllVaccine,
    getVaccineById,
    updateVaccinated
}