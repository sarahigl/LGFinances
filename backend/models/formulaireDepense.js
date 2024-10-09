const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
    montantDepense: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 8,
    },
    categorieDepense: {
        type: String,
        required: false,
        minLength: 3,
        maxLength: 12,
    },
    dateDepense: {
        type: Date,
        required: [true, "La date est obligatoire"],
    },
});

const Finance = mongoose.model("Finance", formSchema);
module.exports = Finance;