/* 

- Start Quiz App With Vanilla Javascript

*/

// My Variables
let correctAnswersCount = document.querySelector(".marks .correct span")
let WrongAnswersCount = document.querySelector(".marks .wrong span")
let QuestContainer = document.querySelector(".qustions-container");

let quesionsCount = document.querySelector(".info-num span");

let selectionElement = document.querySelector(".info-type select");

let FinalResault = document.querySelector(".Quiz-App-parent .resaults ");

// Here Dealing With Server (Real Web API Or JSON File Which Carry A JSON Object) By Making A Request With Approach (AJAX) And Using The Object(>> XMLHttpRequest , It's Properties,Methods-->.open("","",..) , .send() , .onreadystatechange= Fun() , Req.readyState , Req.Status , Req.resonseText <<)
let myJsonObj = new XMLHttpRequest()

// Making A Selections Box To Give The User A Choice To Choose Which Category He Wants To Do The Quiz , By Way I Will Chance The Path Of Request( Req.open("method","URL Or JSON File") ) To A Different JSON Object Files According To The Value The Selection Box
selectionElement.addEventListener("blur", () => {

    if (selectionElement.value === "HTML") {
        myJsonObj.open("GET", "../js/html.json", true)

    } else {
        myJsonObj.open("GET", "../js/questions.json", true)
    }
    myJsonObj.send();
    selectionElement.setAttribute("disabled", '')

})

// We Use The Event (onreadystatechange)= Fun() To Determine If The Request Is Done By Checking It's Values (Req.readyState === 4 , Req.statue === 200) After These We Can Get The Request.responseText ===> Which Will Be Carry The JSON Object String . So You Can Use It As You Need 
myJsonObj.onreadystatechange = function() {

    if (this.status === 200 && this.readyState === 4) {
        let Questionss = JSON.parse(myJsonObj.responseText);

        quesionsCount.innerHTML = Questionss.length;

        QuestContainer.innerHTML = `Here A Quiz Game Give You Some Questions , Timer For Each Single Question (10 Seconds) .<br> So Be Active To Choose The Right Answer .. <br>In Case Of Not Choosing Any We Consider It As Wrong Answer.. Be Ready Bro! `

        // Creating Questions
        AddingQuetionsFromJSONObject(Questionss);

    }
}


// Extracting Questions From JSON Object --> From URL Which Carry Web-API Object Or JSON.File
function AddingQuetionsFromJSONObject(array) {

    // Hiding The Instructions Text After 10 Seconds
    setTimeout(() => {
        QuestContainer.innerHTML = ''
    }, 10000);

    // Making A Loop On JSON Object To Use It's Elements But By Using The setInterval To Control A Timer To Show Questions One By One In 12 Seconds
    let i = 0;

    let Elementscreation = setInterval(() => {

        let divy = document.createElement("div")

        let QuestText = document.createElement("p")
        QuestText.textContent = array[i].question

        let QuestTimer = document.createElement("p")
        QuestTimer.innerHTML = 10;
        QuestTimer.className = "tCount"

        let quetionsDiv = document.createElement("div")
        quetionsDiv.className = "the-question"

        let ans1 = document.createElement("span")
        let ansText1 = document.createTextNode(array[i]["answer-1"])
        ans1.append(ansText1);

        let ans2 = document.createElement("span")
        let ansText2 = document.createTextNode(array[i]["answer-2"])
        ans2.append(ansText2);

        let ans3 = document.createElement("span")
        let ansText3 = document.createTextNode(array[i]["answer-3"])
        ans3.append(ansText3);

        let ans4 = document.createElement("span")
        let ansText4 = document.createTextNode(array[i]["answer-4"])
        ans4.append(ansText4);


        quetionsDiv.append(ans1, ans2, ans3, ans4);


        divy.append(QuestText, QuestTimer, quetionsDiv);

        let hr = document.createElement("hr")
        document.querySelector(".qustions-container").append(divy, hr);


        // Adding Active Class On The Answer You Choose To Comapre It With The Right-ans In The JSON Object Then Increasing The Right Or Wrong Answers
        ChoosingRightAnswer();

        // Decreasing The Timer For Each Single Question And Using A Function(CheckingIfAnswerIsRight) When Timer Ends
        PlayingTheCounterDown(QuestTimer, array[i]);

        i++;

        // Here To Stop The Big setInterval()
        if (i == array.length) {

            clearInterval(Elementscreation);

            setTimeout(() => {
                let AllAnswers = document.querySelectorAll(".the-question span");
                AllAnswers.forEach((span) => span.style.pointerEvents = "none");

                // Showing Resaults
                QuestContainer.innerHTML = '';
                if (correctAnswersCount.innerHTML > (array.length / 2) && correctAnswersCount.innerHTML < (array.length)) {
                    QuestContainer.innerHTML = `<h1 class="meduimLevel">Good You Answerd ${correctAnswersCount.innerHTML} From ${array.length} </h1>`
                } else if (correctAnswersCount.innerHTML == array.length) {
                    QuestContainer.innerHTML = `<h1 class="perfectLevel">perfect You Answerd ${correctAnswersCount.innerHTML} From ${array.length} </h1>`
                } else {
                    QuestContainer.innerHTML = `<h1 class="weakLevel">weak You Answerd ${correctAnswersCount.innerHTML} From ${array.length} </h1>`
                }


            }, 10000);

        }

    }, 12000);


}

// Checking The Right Answer
function ChoosingRightAnswer() {
    let AllAnswers = document.querySelectorAll(".the-question span");
    AllAnswers.forEach((span) => {
        span.addEventListener("click", () => {
            AllAnswers.forEach((el) => {
                el.classList.remove("active")
            });
            span.classList.add("active")
        })
    })
}


function PlayingTheCounterDown(e, ele) {
    let TheTimer = setInterval(() => {
        e.innerHTML--;

        if (e.innerHTML === "0") {
            clearInterval(TheTimer);

            CheckingIfAnswerIsRight(ele);
            e.remove();
        }
    }, 1000);

}


function CheckingIfAnswerIsRight(ele) {
    let chosenAnswer = document.querySelector(".the-question .active");
    let AllAnswers = document.querySelectorAll(".the-question span");

    if (chosenAnswer !== null) {
        if (chosenAnswer.innerHTML === ele["right-ans"]) {
            ++correctAnswersCount.innerHTML;

            AllAnswers.forEach((el) => {
                el.classList.remove("active")
            });
            chosenAnswer.classList.add("right")

        } else {
            WrongAnswersCount.innerHTML++;
            AllAnswers.forEach((el) => {
                el.classList.remove("active")
            });
            chosenAnswer.classList.add("bad")
        }
    } else {
        WrongAnswersCount.innerHTML++;
        return false;
    }
}






// الحمد لله حمداً كثيراً مباركاً فيه
// الحمد لله حمداً ملئ السموات و الارض
// الحمد لله عدد ما كان و عدد ما يكون و عدد الحركات و السكون
// الحمد لله حمداً طيباً مباركاً فيه 
// الحمد لله حتى يرضى و الحمد لله عند الرضى و الحمد لله بعد الرضى
// الحمد لله حمداً تطيب به النفوس 
// الحمد لله حتى يبلغ الحمد منتهاه
// اللهم انى استودعك ما حفظت و ما فهمت و ما قرأت و ما كتبت أمانه و وديعه عندك و أسالك ان ترضه على عند حاجتى اليه فانت حسبى و نعم الوكيل ....