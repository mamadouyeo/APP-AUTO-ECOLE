const mongoose = require('mongoose');

const candidatSchema = new mongoose.Schema(
    {  
        photo:{ type : String },
        nom:{ type : String },
       prenom :{ type: String },
       naissance : { type : String },
       pere : { type: String },
       mere: { type: String },
       identification: { type : String },
       ville: { type : String },
       profession: { type : String },
       nationalite: { type : String },
       contact: { type : String },
       categorie: { type : String },
       creation:{ type: Date, default: () => Date.now(),}
     }
);

module.exports = mongoose.model('Candidat', candidatSchema );