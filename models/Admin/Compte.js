const mongoose = require('mongoose');

const CompteAdminSchema = new mongoose.Schema(
    {  
        
        nom:{ type : String },
       prenom :{ type: String },
       motPasse: { type : String },
       ComfiMotPasse: { type : String },
       creation:{ type: Date, default: () => Date.now(),}
     }
     );

module.exports = mongoose.model('CompteAdmin', CompteAdminSchema );