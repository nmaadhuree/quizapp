var quizobj;
var score = 0;
var flag = 0;
function getdata() {

    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Typical action to be performed when the document is ready:
            quizobj = JSON.parse(xhttp.responseText);
            //for (i = 0; i < obj2.length; i++) {
               // data[i] = obj2[i;
           // }
            console.log(quizobj);
        }
    };
    xhttp.open("GET", "data/quiz.json", true);
    xhttp.send();

}
document.onload = getdata();

var i = 0;

function display() {
    var h1ptr = document.getElementsByTagName("h1");
    h1ptr[0].innerHTML = "";
    var nextptr = document.getElementsByName("next");
    var cancelptr = document.getElementsByName("cancel");
    var choiceptr = document.getElementsByName("choices");
    if (i >= 0) {
        choiceptr[0].style.display = "inline";
        choiceptr[1].style.display = "inline";
        choiceptr[2].style.display = "inline";
        choiceptr[3].style.display = "inline";
        nextptr[0].style.display = "inline";
        cancelptr[0].style.display = "inline";
    }
    if (i > 0) {

        
        validation();

    }
    
    var startptr = document.getElementsByName("mainbutton");
    startptr[0].style.display = "none";
    var divptr = document.getElementById("question");
    var radioptr = document.getElementsByClassName("radioptr");
    var choiceptr = document.getElementsByClassName("choice");
    console.log(divptr);  
    if(i <= quizobj.results.length) { 
        
        divptr.innerHTML = quizobj.results[i].question;

        for (j = 0; j < 4; j++) {
            radioptr[j].value = quizobj.results[i].incorrect_answers[j];
            choiceptr[j].innerHTML = quizobj.results[i].incorrect_answers[j];
            radioptr[j].checked = false;
        }
        i++;
    }
   
}

function validation() {
       
    var choices= document.getElementsByName('choices');
    
    for (p = 0; p < 4; p++) {
        if (choices[p].checked)
        {
            
            console.log(choices[p]);
            if (quizobj.results[i-1].correct_answer == choices[p].value) {
                score++;
                
            }             
        }
    }
    console.log(score);  
    
    if (i == 11) {
        result();

    }
}

function result() {
    var h1ptr = document.getElementsByTagName("h1");
    h1ptr[0].innerHTML = " <span id='blink'>HURRAH..!! You have completed the quiz.</span> <br> Your score is(out of 11): "+score;
    var divptr = document.getElementById("qndiv");
    divptr.style.display = "none";
    var nextptr = document.getElementsByName("next");
    nextptr[0].style.display = "none";
    var cancelptr = document.getElementsByName("cancel");
    cancelptr[0].style.display = "none";
}
function del() {
   
    var h1ptr = document.getElementsByTagName("h1");
    h1ptr[0].innerHTML = " Alas...!! You Forfeighted the quiz";
    var divptr = document.getElementById("qndiv");
    divptr.style.display = "none";
    var nextptr = document.getElementsByName("next");
    nextptr[0].style.display = "none";
    var cancelptr = document.getElementsByName("cancel");
    cancelptr[0].style.display = "none";
}