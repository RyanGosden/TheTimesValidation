$(function(){

//set default language
var lang = 'json/en-lang.json';
//Store selected language in global variable
var text;

//load language file
//change text elements according to langauge
function changeLang(lang){
  $.ajax({
    url: lang,
    dataType: 'json',
    success: function (data) {
      $("#form-title").text(data.title);
      $("#lang-text").text(data.langtext);
      $("#lang-eng").text(data.selectlanguage.english);
      $("#lang-mlt").text(data.selectlanguage.maltese);
      $("#label-username").text(data.form.usr);
      $("#label-email").text(data.form.email);
      $("#label-pass1").text(data.form.password);
      $("#label-pass2").text(data.form.repassword);
      text = data;
    }
  });
}
//set default language to english;
changeLang(lang);

///////////////////////////////////////////////////////////////////////////////
//** Validation Object

var FormValidation = {
    empty: function(array){
     var i=0;
       if ( (array[i] === "") || (array[i].length === 0) || (array[i] === null)   ){
         return false;
       }
       else{
         return true;
       }
    },

    userAvailable : function(cback, username){
      $("#username-group").removeClass("has-success has-error");
      $("#helpBlock1").text("");

      var usr  = username.replace(/\s/g, '');
      $.ajax({
        url: 'json/users.json',
        dataType: 'json',
        success: function (userList) {
        var userExists = (userList.users.indexOf(usr) > -1);

        if ((usr === null) || (usr ==="") || (usr === undefined) ){
            $("#username-group").addClass("has-error");
            $("#helpBlock1").text(text.message.empty).show();
            cback(false);
        }
        else{
            if (userExists === true){
              $("#username-group").addClass("has-error");
              $("#helpBlock1").text(text.message.username.fail).show();
              cback(false);
            }
            else{
              $("#username-group").addClass("has-success");
              $("#helpBlock1").text(text.message.username.pass).show();
              cback(true);
            }
          }
        }
      });
    },

    emailValid : function(email){
      $("#email-group").removeClass("has-success has-error");

      var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if(!regex.test(email)){
          $("#email-group").addClass("has-error");
          $("#helpBlock2").text(text.message.email.fail).show();
          return false;
        }
        else{
          $("#email-group").addClass("has-success");
          $("#helpBlock2").text(text.message.email.pass).show();
          return true;
        }
    },

    pwdMatch : function(pwd1, pwd2){
      $("#pw2-group").removeClass("has-success has-error");

      if (pwd1 === pwd2) {
        $("#pw2-group").addClass("has-success");
        $("#helpBlock4").text(text.message.passmatch.pass).show();
        return true;
      }
      else{
        $("#pw2-group").addClass("has-error");
        $("#helpBlock4").text(text.message.passmatch.fail).show();
        return false;
      }
    },

    pwdComplex : function(pwd1){
      $("#pw1-group").removeClass("has-success has-error");
          if ((pwd1 === null) || (pwd1 ==="") || (pwd1 === undefined)){
            $("#pw2-group").addClass("has-error");
            $("#helpBlock3").text(text.message.empty).show();
            return false;
          }

          if (pwd1 < 7){
            $("#pw1-group").addClass("has-error");
            $("#helpBlock3").text(text.message.passlength).show();
            return false;
          }
          else {
                if (  (pwd1.match(/\d+/g)) && (pwd1.match(/[a-z]/g)) && (pwd1.match(/[A-Z]/g)) && (pwd1.match(/^[\w\W]*\W[\w\W]*$/))  ){
                  $("#pw1-group").addClass("has-success");
                  $("#helpBlock3").text(text.message.complex.pass).show();
                  return true;
                }
                else{
                  $("#pw1-group").addClass("has-error");
                  $("#helpBlock3").text(text.message.complex.fail).show();
                return false;
                }
              }
    },

};
//Function Visually displays password strength
function showPasswordStrength(score){
  var pwText;
  var blockColour;
  $(".pwstr-block").remove();

      if (  (score >= 0) && (score <= 24) ){
      pwText = text.message.passstrength.vweak;
      blockColour = "red";
    addBlock(1, pwText, blockColour);
    }
    if (  (score >= 25) && (score <= 49) ){
      pwText = text.message.passstrength.weak;
      blockColour = "#FF6347";
    addBlock(2, pwText, blockColour);
    }
    if (  (score >= 50) && (score <= 59) ){
      pwText = text.message.passstrength.average;
      blockColour = "#FFA62F";
    addBlock(3, pwText, blockColour);
    }
    if (  (score >= 60) && (score <= 69) ){
      pwText = text.message.passstrength.strong;
      blockColour = "#89C35C";
    addBlock(4, pwText, blockColour);
    }
    if (  (score >= 70) && (score <= 79) ){
      pwText = text.message.passstrength.vstrong;
      blockColour = "#54C571";
    addBlock(5, pwText, blockColour);
    }
    if (  (score >= 80) && (score <= 89) ){
      pwText = text.message.passstrength.secure;
      blockColour = "#4CC417";
    addBlock(6, pwText, blockColour);
    }
    if (score >= 90) {
      pwText = text.message.passstrength.vsecure;
      blockColour = "green";
    addBlock(7, pwText, blockColour);
    }

    function addBlock(qty, pwstrText, colour){
    //    $("#pwstr-text").text(pwstrText);
    for (var i=0; i<qty; i++)
      $("#pwstr-bar").append('<div class="pwstr-block"></div>');
      $(".pwstr-block").css("background-color", colour);
      $("#pwstr-text").text(pwstrText);
    }
  }

//Function checks Strength of PW and gives a score to be shown visually when passed to showPasswordStrength
function checkStrength(pass){
    var score =0;
    testLength();

    function testLength(){
    //test length
    if (pass.length <= 4 ){
        score = score + 5;
        testLetters();
    }
    if ((pass.length >= 5) && (pass.length <= 7)){
          score = score + 10;
          testLetters();
    }
    if (pass.length >= 8){
        score = score + 25;
        testLetters();
    }
    }

    function testLetters(){
    //check if contains Letters
    if((pass.match(/[a-z]/g)) && (pass.match(/[A-Z]/g))){
      score = score + 25;
      //if upper or lower is not present do not add to score
      testNumbers();
    }

    else{
       testNumbers();
     }
    }

    function testNumbers(){
    //check if contains numbers
    if ((pass.match(/\d/g)) === null){
      testChar();
    }
    else{
      var ncount = pass.match(/\d/g).length;
        if (ncount <=1){
          score = score + 10;
          testChar();
        }
        else{
          //more than 1
          score = score + 25;
          testChar();
        }
    }
    }

    function testChar(){
    //check if contains characters

    if ((pass.match(/[^A-Za-z0-9_]/g)) === null){
      showPasswordStrength(score);
    }
    else{
      var ccount = pass.match(/[^A-Za-z0-9_]/g).length;
      if (ccount === 0){
        //do not add to score
        showPasswordStrength(score);
      }
      if (ccount <=1){
        score = score + 10;
        showPasswordStrength(score);
      }
      else{
        //more than 1
        score = score + 25;
        showPasswordStrength(score);
      }
    }
  }
} //End of Check Strength


var userFree;
function userCallback(cback){
  userFree = cback;
  return userFree;
  }

/////////////////////////////////////////////////////////////////////////////
//-----------------------------Events-------------------------------------//

$("#lang-eng").on("click", function(){
  lang = 'json/en-lang.json';
  changeLang(lang);
});

$("#lang-mlt").on("click", function(){
  lang = 'json/ml-lang.json';
  changeLang(lang);
});

$("#submit").on("click", function(e) {
  var usr = $("#username").val();
  var email = $("#email").val();
  var pwd1 = $("#password1").val();
  var pwd2 = $("#password2").val();
  var submitArray = [];
  submitArray.push(usr,email, pwd1, pwd2);
  var callback = FormValidation.userAvailable(userCallback, usr);

  if((userFree === true) && (FormValidation.emailValid(email) === true) && (FormValidation.pwdComplex(pwd1) === true) && (FormValidation.pwdMatch(pwd1, pwd2)===true) && (FormValidation.empty(submitArray)===true) ){
    console.log("form validation successful.");
  }
  else {
    e.preventDefault();
    console.log("form validation failed.");
  }
});

$('#username').on('keyup', function(){
  var usr = $("#username").val();
  FormValidation.userAvailable(userCallback, usr);
});

$('#email').on('keyup', function(){
  var email = $("#email").val();
  FormValidation.emailValid(email);
});

$('#password1').on('keyup', function(){
  $(".pwstr-block").remove();
  var pass = $("#password1").val();
  checkStrength(pass);
  FormValidation.pwdComplex(pass);
});

$('#password2, #password1').on('keyup', function(){
  var pwd1 = $("#password1").val();
  var pwd2 = $("#password2").val();
  FormValidation.pwdMatch(pwd1, pwd2);
});

});
