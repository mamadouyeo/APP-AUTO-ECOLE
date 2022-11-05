
// importation des variables d'environnement<
const dotenv = require('dotenv');
const result = dotenv.config();
const express = require('express');
//connection à la base de donne
//  const mongoose =require('mongoose');
// const connectioninternet = mongoose.connect(
//     `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.lhkined.mongodb.net/TODOLISTi?retryWrites=true&w=majority`,
// { useNewUrlParser: true,
//   useUnifiedTopology: true 
// })
// .then(() => console.log('Connexion à MongoDB réussie !'))
// .catch(() => console.log('Connexion à MongoDB échouée !'));

// connection de la base de donnee en local
const mongoose =require('mongoose');
const connectionlocal = mongoose.connect('mongodb://localhost:27017/TODOLIST', { useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
  // module.exports = connectioninternet ;
module.exports = connectionlocal;
