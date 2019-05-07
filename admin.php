<?php
function afficher_cat()
{
    global $bdd;
    $category = array();
    $req = $bdd->query('SELECT * FROM category');
    while($data = $req->fetch()){
      $category[]=$data;
    }
    return $category;
}

/*function traitement()
{*/
  global $bdd;
  $tab= array("category_id"=>"","name"=>"","photo"=>"","desc"=>"", "prix"=>"",
"message"=>"","nameError"=>"","photoError"=>"","descError"=>"","prixError"=>"","gError"=>"",
"imagePath"=>"","imageExtension"=>"","isSuccess"=>false,"isUploadSuccess"=>false );

if (isset($_POST) AND $_SERVER['REQUEST_METHOD'] == "POST" ) {

    $tab['category_id']= verifyInput($_POST['category_id']);
    $tab['name']= verifyInput($_POST['name']);
    $tab['desc']= verifyInput($_POST['desc']);
    $tab['prix']= verifyInput($_POST['prix']);
    $tab['photo']= verifyInput($_FILES["photo"]["name"]);     
    //un isset pour l image
    $tab['isUploadSuccess']= true ;
    $tab['isSuccess']= true ;
    
    

    // verification name
    if (empty($tab['name'])) {
        $tab['nameError'] = 'le titre stp !!';
        $tab['isSuccess']= false ;
    } else {
        if (!isLetter1($tab['name'])) {
            $tab['nameError'] = " ce n'est pas un titre ";
            $tab['isSuccess']= false ;
        } else {
            $tab['name'] ;
        }
        
    }
     
     // verification de la description
     if (empty($tab['desc'])) {
        $tab['descError'] = 'ta description stp !!';
        $tab['isSuccess']= false ;
    } else {
        if (limitDesc($tab['desc'])<=200) {
            $tab['desc'] ;
        } else {
            $tab['descError'] = "la taille de la description ne doit pas exceder les 200 caracteres ";
            $tab['isSuccess']= false ;
        }
        
    }
    //prix
     if (empty($tab['prix'])) {
        $tab['prixError'] = 'le prix stp !!';
        $tab['isSuccess']= false ;
    } else {
        if (!isNumeric($tab['prix'])) {
            $tab['prixError'] = " ce n'est pas un prix ";
            $tab['isSuccess']= false ;
        } else {
            $tab['prix'] ;
        }
        
    }
    // verification plan
    if(empty($tab['photo'])) 
    {
        $tab['photoError'] = 'Ce champ ne peut pas être vide';
        $tab['isUploadSuccess']= false ;
    }
    else
    {
      if ($_FILES['photo']['size'] <= 6000000)
      {
              // Testons si l'extension est autorisée

              $infosfichier = pathinfo($_FILES['photo']['name']);
              $result = explode('.',$_FILES['photo']['name']);
              $extension_upload =strtolower(end($result));
              $extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png');

              if (in_array($extension_upload, $extensions_autorisees)==true)
         
              {    
                      // On peut valider le fichier et le stocker définitivement
                      $tab['photo'];

              }
              else
              {
                  $tab['pphotoError']='extension non valide vous devez uploader un fichier jpg,jpeg, gif,png';
                  $tab['isUploadSuccess']= false ;
              }

      }
      else
      {

          $tab['pphotoError']='la taille du fichier ne doit pas depasser 6Mo';
          $tab['isUploadSuccess']= false ;

      }

    }
    
    // mise en route de la base de donnée
    if ($tab["isSuccess"]&&$tab["isUploadSuccess"]) {
       
        $selectPlan= $bdd->prepare('SELECT * FROM items WHERE name=? AND image=?');
        $selectPlan->execute(array($tab['name'],$tab['photo']));
        $rows=$selectPlan->rowCount();
       
        if($rows==0)
        {
           
            $insertPlan=$bdd->prepare('INSERT INTO items(category_id,name,price,description,image,date_reg) VALUES(?,?,?,?,?,NOW())');
            $insertPlan->execute(array($tab['category_id'],$tab['name'],$tab['prix'],$tab['desc'], $tab['photo']));
  
            move_uploaded_file($_FILES['photo']['tmp_name'],dirname(__FILE__).'/menu/' . basename( $tab['photo']));
            $tab['message']='menu bien enregistré';
        }
        else
        {
            $tab['gError']='Il semble que ce menu a deja ete  enregistré';
        }
    }

  echo json_encode($tab);
}

/*}*/


?>