import {getAllResto} from "../model/Meal.js";

export const getMealsData = (req, res) =>{
    getAllResto((err, data)=>{
        if (err)
            return err.erreur === "no_data" ? res.status(404).send({message: 'Aucune donnée'}) : res.status(500).send({message: "Erreur"});

        res.status(200).send(data)
    })
}
