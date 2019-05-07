//add admin
$(function () {
    
  $('#formadd').submit(function(e) {
      e.preventDefault();
      $('#AnameError').empty();
      $('#AlastnameError').empty();
      $('#AemailError').empty();
      $('#AtelError').empty();
      $('#ApasswordError').empty();
      $('#ArepasswordError').empty();
      $('#Ad').empty();
      var postdata = $('#formadd').serialize();
      $.ajax({
          type: 'POST',
          url: '../models/addAdmin.php',
          data: postdata,
          dataType: 'json',
          success: function(json) {
               
              if(json.isSuccess) 
              {
                  if (json.globalError) {
                    $('#Ad').append('<strong style="color:red" class="btn">'+json.globalError+'</strong><br>');
                    $('#formadd')[0].reset();
                   }else{
                  $('#Ad').append('<strong style="color:green" class="btn">'+json.message+'</strong><br>');
                  $('#formadd')[0].reset();
              }
              }
              else
              {    
                console.log(json.telError);
                $('#AnameError').append('<strong style="color:red" class="btn">'+json.nameError+'</strong><br>');
                $('#AlastnameError').append('<strong style="color:red" class="btn">'+json.lastnameError+'</strong><br>');
                $('#AtelError').append('<strong style="color:red" class="btn">'+json.telError+'</strong><br>');
                $('#AemailError').append('<strong style="color:red" class="btn">'+json.emailError+'</strong><br>');
                $('#ApasswordError').append('<strong style="color:red" class="btn">'+json.passwordError+'</strong><br>');
                $('#ArepasswordError').append('<strong style="color:red" class="btn">'+json.repasswordError+'</strong><br>');
                 return false;
              }                
          }
      });
  });

})
///login
$(function () {
    
  $('#loginform').submit(function(e) {
      e.preventDefault();
      $('#emailError').empty();
      $('#passwordError').empty();
      var postdata = $('#loginform').serialize();
      
      $.ajax({
          type: 'POST',
          url: '../traitements/tconnexion.php',
          data: postdata,
          dataType: 'json',
          success: function(json) {
               
              if(json.isSuccess) 
              {
                
                if (json.globalError) {
                       $('#ret').html(json.globalError).css("color","red").css("font-style","italic");
                       $('#ret')[0].reset();
                   }else{
                  document.location.href = '../pages/admin.php';

              }
              }
              else
              {    
                   
                  $('#emailError').html(json.emailError).css("color","red").css("font-style","italic");
                  $('#passwordError').html(json.passwordError).css("color","red").css("font-style","italic");
          

                 return false;
              }                
          }
      });
  });

})
//connexion ou login (verification avec keyup)

$(document).ready(function(){
$(function(){
  $("#loginform").keyup(function(e){
   e.preventDefault();
   $("#emailError").empty();
   $("#passwordError").empty();
   var data =$("#loginform").serialize();
   
   
   $.ajax({
     type:'POST',
     url:'../traitements/tconnexion.php',
     data:data,
     dataType:'json',
     success:function(dataUse){
       //verification directe des coordonnees de login user
       //verify nom
       if (dataUse.emailDb) {
         $("input:text").css({
          color:'green',
          fontSize:'18px',
          fontStyle:'italic',
          fontFamily:'sans-serif',
          borderColor:'green' 
         });
         
       }else
       {

        $("input:text").css({
          color:'red',
          fontSize:'18px',
          fontStyle:'italic',
          fontFamily:'sans-serif',
          borderColor:'red' 
         });
       }
       //password verify
       if (dataUse.passwordDb) {
        $("input:password").css({
         color:'green',
         fontSize:'18px',
         fontStyle:'italic',
         fontFamily:'sans-serif',
         borderColor:'green' 
        });
      }else
      {
       $("input:password").css({
         color:'red',
         fontSize:'18px',
         fontStyle:'italic',
         fontFamily:'sans-serif',
         borderColor:'red' 
        });
      }
      if (dataUse.isSuccess) {
        
      }else
      {
        //  console.log(dataUse.emailError);
      }
     }
   });
  });
})
})

//ajout de item

$(function () {
  $('#addPlan').submit(function (e){
      e.preventDefault();
      $('#nameError').empty();
      $('#photoError').empty();
      $('#descError').empty();
      $('#entete').empty();
        $('#prixError').empty();
     
      var myForm = document.getElementById('addPlan');
      var data =new FormData(myForm);
       
       $.ajax({
          type: 'POST',
          url: 'admin.php',
          data: data,
          cache: false,
          processData: false,
          contentType: false,
          dataType: 'json',
          success:function (results) {
                 alert(data);
            console.log('kkkkkk');
              if (results.isSuccess && results.isUploadSuccess) {
                if(results.message)
                {
                  $('#entete').append('<strong style="color:green" class="btn">'+results.message+'</strong><br>');
                  $('#addPlan')[0].reset();
                }
                if(results.gError)
                {
                  $('#entete').append('<strong style="color:red" class="btn">'+results.gError+'</strong><br>');
                  $('#addPlan')[0].reset();
                }
                
              } else {
                  $('#nameError').append('<strong style="color:red"  class="btn">'+results.nameError+'</strong><br>');
                  $('#planError').append('<strong style="color:red"  class="btn">'+results.photoError+'</strong><br>');
                  $('#descError').append('<strong style="color:red"  class="btn">'+results.descError+'</strong><br>');
                 $('#prixError').append('<strong style="color:red"  class="btn">'+results.prixError+'</strong><br>');

              }
          }
       });
  });
  
})


//ajout de model

$(function () {
  $('#addModel').submit(function (e){
      e.preventDefault();
      $('#MnameError').empty();
      $('#modelError').empty();
      $('#enteteM').empty();
      var myForm = document.getElementById('addModel');
      var data =new FormData(myForm);
       $.ajax({
          type: 'POST',
          url: '../traitements/addmodel.php',
          data: data,
          cache: false,
          processData: false,
          contentType: false,
          dataType: 'json',
          success:function (results) {
              if (results.isSuccess && results.isUploadSuccess) {
                if(results.message)
                {
                  $('#enteteM').append('<strong style="color:green" class="btn">'+results.message+'</strong><br>');
                  $('#addModel')[0].reset();
                }
                if(results.gError)
                {
                  $('#enteteM').append('<strong style="color:red" class="btn">'+results.gError+'</strong><br>');
                  $('#addModel')[0].reset();
                }
                
              } else {
                  $('#MnameError').append('<strong style="color:red"  class="btn">'+results.nameError+'</strong><br>');
                  $('#modelError').append('<strong style="color:red"  class="btn">'+results.modelError+'</strong><br>');
                 
              }
          }
       });
  });
  
})

//delete plan and model

$(function () {
  $('#deletePlan').submit(function (e){
      e.preventDefault();
      var data = $('#deletePlan').serialize();
    
       $.ajax({
          type: 'POST',
          url: '../traitements/delete.php',
          data: data,
          dataType: 'json',
          success:function (results) {
              if (results.isSuccess) {
               if(results.message)
               {
                 alert(results.message);
               }
              } else {
                
                 
              }
          }
       });
  });
  
})

//validation de la demande
$(function () {
  $('#user').submit(function (e){
      e.preventDefault();
      $('#nameError').empty();
      $('#lastnameError').empty();
      $('#emailError').empty();
      $('#telError').empty();
      $('#villeError').empty();
      $('#codeError').empty();
      $('#villepError').empty();
      $('#nombreError').empty();
      $('#adresseError').empty();
      $('#budgetError').empty();
      $('#sujetError').empty();
      
      var data = $('#user').serialize();
       $.ajax({
          type: 'POST',
          url: '../traitements/user_send.php',
          data: data,
          dataType: 'json',
          success:function (results) {
              if (results.isSuccess) {
                if(results.rows=='ok'){
                  alert(results.message);
                  $('#user')[0].reset();
                }
               else
               {
                alert(results.gError);
                $('#user')[0].reset();
               }
              } else {
                $('#nameError').append('<strong style="color:red"  class="btn">'+results.nameError+'</strong>');
                $('#lastnameError').append('<strong style="color:red"  class="btn">'+results.lastnameError+'</strong>');
                $('#emailError').append('<strong style="color:red"  class="btn">'+results.emailError+'</strong>');
                $('#telError').append('<strong style="color:red"  class="btn">'+results.telError+'</strong>');
                $('#codeError').append('<strong style="color:red"  class="btn">'+results.codeError+'</strong>');
                $('#adresseError').append('<strong style="color:red"  class="btn">'+results.adresseError+'</strong>');
                $('#villeError').append('<strong style="color:red"  class="btn">'+results.villeError+'</strong>');
                $('#villepError').append('<strong style="color:red"  class="btn">'+results.villepError+'</strong>');
                $('#nombreError').append('<strong style="color:red"  class="btn">'+results.nombreError+'</strong>');
                $('#budgetError').append('<strong style="color:red"  class="btn">'+results.budgetError+'</strong>');
                $('#sujetError').append('<strong style="color:red"  class="btn">'+results.sujetError+'</strong>');
                 
              }
          }
       });
  });
  
})



/*
//visiteur
setInterval('load_m()', 500);
function load_m() {
 $('#visit').load('../traitements/visiteurload.php');
 }
 setInterval('load_v()', 500);
 function load_v() {
  $('#visit1').load('../traitements/visiteurload.php');
  }

 setInterval('load_messages()', 500);
function load_messages() {
 $('#visit2').load('traitements/visiteurload.php');
 }
*/





















//
$(document).ready(function() {
    // Check if element is scrolled into view
    function isScrolledIntoView(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
  
      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();
  
      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    // If element is scrolled into view, fade it in
    $(window).scroll(function() {
      $('.scroll-animations .animated').each(function() {
        if (isScrolledIntoView(this) === true) {
          $(this).addClass('fadeInLeft');
        }
      });
    });
  });

  $(document).ready(function() {
    
    $('#volet').slideToggle( "slow", function() {
     
     });
    $('#ov').click(function(){
      var cl = $('#ouvrir').attr('class');
        if(cl== $('#ouvrir').attr('class'))
        {
          $('#volet').slideToggle( "slow", function() {
            $('#ouvrir').removeClass('fas fa-angle-double-right');
            $('#ouvrir').addClass('fas fa-angle-double-left');
            console.log(cl);
           });
        }
        else{
       
       
          $('#volet').slideToggle( "slow",'up', function() {
            $('#ouvrir').removeClass('fas fa-angle-double-left');
            $('#ouvrir').addClass('fas fa-angle-double-right');
            return false;
           });
       
        }
    })
    
  });
 

$(document).ready(function(){
  $('#ajoutModel').hide();
  $('#plus').click(function(){
    $('#ajoutModel').slideToggle( "slow", function() {
    })
  });
})
