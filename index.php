
<?php
function data()
{
   global $bdd;
   $user_data=array();
if (isset($_SESSION['id']) AND $_SESSION['id'] > 0) {
  $getid=(int)$_SESSION['id']=1;
  $requser= $bdd->prepare("SELECT * FROM membres WHERE id=?");
  $requser -> execute(array($getid));

  while ( $userinfo = $requser->fetch()) {
    $user_data[]=$user_data;
  }

}//else header('Location:./pages/connexion.php');
 

  return $user_data ;
 

   /*

if (empty($userinfo['avatar'])) {
    $userinfo['avatar']="avatard.jpeg";
  }
  
  if (empty($userinfo['id'])) {
    $redirect="pages/connexion";
  }else
  {
  $redirect='pages/profil?id='.$userinfo['id'];
  
  }*/

//contactez-nous
}
/*
function carousel()
{
   global $bdd;
   $carousel=array();
   $result_carousel= $bdd->query('SELECT * FROM carousel');
   while ($c=$result_carousel->fetch())
   {
     $carousel[]=$c;
   }

  return $carousel;
}*/
?>
