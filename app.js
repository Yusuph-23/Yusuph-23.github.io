const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function pageTransitions() {
    // Button click active class
    for (let i = 0; i < sectBtn.length; i++) {
        sectBtn[i].addEventListener('click', function () {
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            sectBtn[i].className += ' active-btn'; // Use sectBtn[i] instead of this
        });
    }

    //section active class
   allSections.addEventListener('click', (e) => {
       const id = e.target.dataset.id;
       if(id){
        //remove selected from btns
        sectBtn.forEach((btn) =>{
            btn.classList.remove('active')
        })
        e.target.classList.add('active')

        //hide other sections
        sections.forEach((section)=>{
            section.classList.remove('active')
        })
        const element =document.getElementById(id);
        element.classList.add('active');
       }
   })

   //toggle button
   const themeBtn = document.querySelector('.theme-btn');
   themeBtn.addEventListener('click',() => {
    let element = document.body;
    element.classList.toggle('light-mode')
   })
}

//for the form
var form = document.getElementById("my-form");
  
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)

pageTransitions();