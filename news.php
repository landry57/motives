<?php
function afficher_news()
{
    global $bdd;
    $news = array();
    $req = $bdd->query('SELECT * FROM items');
    while($data = $req->fetch()){
      $news[]=$data;
    }
    return $news;
}




?>