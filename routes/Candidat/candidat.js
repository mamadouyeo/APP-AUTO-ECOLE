const express = require('express');
const router = express.Router();
const Candidat = require('../../models/Candidat/inscription');
const CandidatControleur = require('../../controleurs/Candidat/candidat');
const multer = require('multer');
const fs = require('fs');


//les routes  des differentes pages du site
router.get('/api/auto-ecole/v1',(req, res)=>{
  res.render('index' ,{title : 'page accueil'});
}
);
router.get('/api/auto-ecole/v1/views/formulaire.ejs',(req, res)=>{
  res.render('formulaire' ,{title : 'page formulaire'});
}
);

router.get('/api/auto-ecole/v1/views/edite.ejs',(req, res)=>{
  res.render('edite' ,{title : 'page modification du formulaire'});
}
);

router.get('/api/auto-ecole/v1/views/liste_candidat.ejs',(req, res)=>{
  res.render('liste_candidat' ,{title : 'page listes des candidat'});
}
);
router.get('/api/auto-ecole/v1/views/compte.ejs',(req, res)=>{
  res.render('compte' ,{title : 'page creation de compte Admin'});
}
);
router.get('/api/auto-ecole/v1/views/connection.ejs',(req, res)=>{
  res.render('connection' ,{title : 'page connexion'});
}
);


//définir le stockage des images

const storage = multer.diskStorage({
  // destination des fichiers
  destination:  (req, file, callback)=> {
    callback(null, './public/uploads/images');
  },

  // rajoute l'extension
  filename: function (req, file, callback) {
    callback(null,file.filename+"-"+Date.now()+"-"+file.originalname);
  },
});
//télécharger les paramètres pour multer
const upload = multer({
  storage: storage,
}).single('photo');


// la route pour enregistrer les données dans la base de donnée
router.post('/api/auto-ecole/v1/enregistre',upload, (req, res)=>
{
  console.log(req.body);
  const candidat = new Candidat(
    {
      photo: req.file.filename,
      nom : req.body.nom,
      prenom : req.body.prenom,
      naissance :req.body.naissance,
      pere : req.body.pere,
      mere : req.body.mere,
      identification : req.body.identification,
      nationalite : req.body.nationalite,
      ville: req.body.ville,
      contact:req.body.contact, 
      profession : req.body.profession,
      categorie :req.body.categorie
       });
       candidat.save((err)=>
       {
        if (err) 
        {
          res.status(500).json({ message: err.message, type: 'danger' });
        } 
        else 
        {
          req.session.message ={
            type : 'succese',
            message : 'candidat ajoute avec succes'
          };
          res.redirect('/views/formulaire.ejs');
          
        }
       });

    
});
// la liste des candidats
router.get('/api/auto-ecole/v1/ListesCandidats',(req, res)=>{ 
  Candidat.find().exec((err , candidat)=>{
    if (err) 
    {
      res.status(500).json({ message: err.message });
    } 
    else 
    {
       res.status(200).render('liste_candidat.ejs', 
       {title : 'formulaire Candidats' , 
       candidat : candidat,});
    }
  }
  );
 
}
);

// modification des candidats
router.get('/api/auto-ecole/v1/edite/:id',(req, res)=>
{
  let id = req.params.id;
 Candidat.findById(id,(err, Candidat)=>
 {
  if (err) 
  {
     res.status(500).redirect('/') ;  
  } else {
    if (Candidat == null) {
      res.status(500).redirect('/') ;
    } else {
      res.status(200).render('edite.ejs', 
      {title : 'modification du Candidats' , 
      candidat : Candidat,});
    }
  }
 }
 );
}
);

// mise ajour des candidats
router.post('/api/auto-ecole/v1/update/:id',upload,(req, res)=>
{
  let id = req.params.id;
  let nouvelle_photos ='';
  if(req.file)
  {
    nouvelle_photos = req.file.fieldname;
    try{
      fs.unlinkSync('./public/uploads/images/'+ req.body.nouvelle_photo );
    }
    catch(err){
      console.log(err);
      
    }
  }else
  {
        nouvelle_photos = req.body.nouvelle_photo;
      }
  
      Candidat.findByIdAndUpdate(id, {
      photo : nouvelle_photos,
      nom : req.body.nom,
      prenom : req.body.prenom,
      naissance :req.body.naissance,
      pere : req.body.pere,
      mere : req.body.mere,
      identification : req.body.identification,
      nationalite : req.body.nationalite,
      ville: req.body.ville,
      contact:req.body.contact, 
      profession : req.body.profession,
      categorie :req.body.categorie
      }, (err, Result)=>{
        if(err)
        {
          res.status(500).json({ message: err.message, type: 'danger' });
        }else 
        {
          req.session.message ={
            type : 'succese',
            message : 'candidat modifie avec succes'
          };
          
    
        }
        res.render('liste_candidat.ejs');
      });
});

// supression d'un candidat
router.get('/api/auto-ecole/v1/delete/:id', (req, res) =>
{
  let id = req.params.id;
Candidat.findByIdAndRemove(id, (err, Result)=>
{
if (Result.photo !='') 
{
  try {
    fs.unlinkSync('./public/uploads/images/'+ Result.photo );
  } catch (err) 
  {
    console.log(err)
  }
}
if(err)
        {
          res.status(500).json({ message: err.message, type: 'danger' });
        }else 
        {
          req.session.message ={
            type : 'succese',
            message : 'candidat supprime avec succes'
          };
          res.redirect('liste_candidat.ejs');
          
        }
});
});

module.exports = router;