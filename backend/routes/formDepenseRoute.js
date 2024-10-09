const express = require("express");
const router = express.Router();
const formulaireDepense = require("../models/formulaireDepense");

// Cette fonctionnalité gère la route POST pour l'enregistrement d'un formulaire de dépense
router.post("/formulaireDepense", async (req, res) => {
    try {
        // Extraction des données du corps de la requête
        const { montant, categorie, date } = req.body;
        
        // Vérification et conversion du montant en un nombre flottant
        const montantNumber = parseFloat(montant);
        // Si le montant ne peut pas être converti en un nombre, une erreur 400 est renvoyée
        if (isNaN(montantNumber)) {
            return res.status(400).json({ msg: "Le montant doit être un nombre valide" });
        }

        // Vérification et conversion de la date en un objet Date
        const dateObject = new Date(date);
        // Si la date ne peut pas être convertie en un objet Date valide, une erreur 400 est renvoyée
        if (isNaN(dateObject.getTime())) {
            return res.status(400).json({ msg: "La date doit être une date valide" });
        }

        // Création d'un nouveau formulaire de dépense avec les données vérifiées et converties
        const newform = new formulaireDepense({
            montantDepense: montantNumber,
            categorieDepense: categorie,
            dateDepense: dateObject
        });
        
        // Enregistrement du formulaire de dépense dans la base de données
        await newform.save();
        // Si l'enregistrement réussit, un message de succès est renvoyé avec le statut 201
        res.status(201).json({ msg: "Dépense enregistrée" });
    } catch (error) {
        // Si une erreur survient lors de l'enregistrement, un message d'erreur est consigné dans la console
        console.error("Erreur lors de l'enregistrement de la dépense:", error);
        // Un message d'erreur est également renvoyé au client avec le statut 500
        res.status(500).json({ msg: "Impossible d'enregistrer la dépense", error: error.message });
    }
});

// Exportation du routeur pour son utilisation dans d'autres parties de l'application
module.exports = router;