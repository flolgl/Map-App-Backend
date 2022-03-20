import {addResto, getAllResto, vote} from "../model/Meal.js";

export const getMealsData = (req, res) =>{
    getAllResto((err, data)=>{
        if (err)
            return err.erreur === "no_data" ? res.status(404).send({err: 'Aucune donnée'}) : res.status(500).send({err: "Erreur"});

        res.status(200).send(data)
    })
}

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