import {addResto, getAllResto, vote} from "../model/Meal.js";

/**
 * Controller permettant de récupérer les données des restaurants
 * @param req Request représentant la requête
 * @param res La réponse : 200 quand c'est good - 404 ou 500 sinon
 */
export const getMealsData = (req, res) =>{
    getAllResto((err, data)=>{
        if (err)
            return err.erreur === "no_data" ? res.status(404).send({err: 'Aucune donnée'}) : res.status(500).send({err: "Erreur"});

        res.status(200).send(data)
    })
}

/**
 * Controller permettant de récupérer les données des restaurants
 * @param req Request représentant la requête
 * @param res La réponse : 200 quand c'est good - 404 ou 500 sinon
 */
export const addNewResto = (req, res) => {

    if(!req.session.user)
        return res.status(500).send({err:"User not connected"})

    const {name, descr, lat, lng} = req.body
    if(!name || !descr || !lat || !lng)
        return res.status(500).send({err:"Data error"})


    addResto([name, descr, "["+[lat, lng].toString() + "]"], (err) => {
        return err ? res.status(500).send({err}) : res.status(200).send({err:null})
    })

}

/**
 * Controller permettant de voter pour un restaurant
 * @param req Request représentant la requête
 * @param res La réponse : 200 quand c'est good - 404 ou 500 sinon
 */
export const voteForResto = (req, res) => {

    if(!req.session.user)
        return res.status(500).send({err:"Erreur : User not connected"})

    const {itemId, upVote} = req.body

    if(!itemId || upVote == null)
        return res.status(500).send({err:"Erreur"})

        vote([req.session.user.id, itemId, upVote ? 1 : -1], (err) => {
        return err ? res.status(500).send({err}) : res.status(200).send({err:null})
    })

}