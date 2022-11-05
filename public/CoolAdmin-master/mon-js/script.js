function toggleForm(){
    // on réccupère l'élément form.
    let formulaire = document.getElementById('formulaire');
  
    // Condition pour afficher/cacher le formulaire en fonction de son état
    if(formulaire.style.display == 'block')
    {
        formulaire.style.display = 'none';
    }else{
        formulaire.style.display = 'block';
    }
}

// faire et appparaîte le formulaire





function handleFiles(files) {
    var imageType = /^image\//;
    for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (!imageType.test(file.type)) {
      alert("veuillez sélectionner une image");
    }else{
      if(i == 0){
        preview.innerHTML = '';
      }
      var img = document.createElement("img");
      img.classList.add("obj");
      img.file = file;
      preview.appendChild(img); 
      var reader = new FileReader();
      reader.onload = ( function(aImg) { 
      return function(e) { 
      aImg.src = e.target.result; 
    }; 
   })(img);
 
  reader.readAsDataURL(file);
  }
  
  }
 }

 // faire clignonter le texet

 var clignotement = function(){ 
    if (document.getElementById('DivClignotante').style.visibility=='visible'){ 
       document.getElementById('DivClignotante').style.visibility='hidden'; 
    } 
    else{ 
    document.getElementById('DivClignotante').style.visibility='visible'; 
    } 
 }; 
 // mise en place de l appel de la fonction toutes les 0.10 secondes 
 // Pour arrêter le clignotement : clearInterval(periode); 
 periode = setInterval(clignotement, 1000); 

 var a = document.createElement('a');  
var lien = document.createTextNode("Voici un lien"); 
a.appendChild(lien);  
a.title = "Comment faire un lien en JavaScript";  
a.href = "https://www.1formatik.com/4902/comment-creer-un-lien-en-javascript";
document.body.appendChild(a); 
 