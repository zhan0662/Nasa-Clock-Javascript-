let set = document.querySelector('.set');
let more = document.querySelector('.more');
let $menu = document.querySelector('.menu');
let $setting = document.querySelector('.setting');
const $day  = document.getElementById('day')
const $month  = document.getElementById('month')
const $year  = document.getElementById('year')
const $weekyear  = document.getElementById('weekyear')
const now = new Date()
 const $settingform = document.getElementById('settingform')
const $container  = document.getElementById('container')
let $seconds = ``
let $date = ``
let currenttime = ``
let currentdate = ``

if (localStorage.getItem('seconds')){
  $seconds = localStorage.getItem('seconds')
  $date = localStorage.getItem('date')
}

Date.prototype.getWeek = function() {
  let onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

let today = new Date();
let weekNumber = today.getWeek();

more.addEventListener("click", function() {
  menu.classList.toggle("menu")
  if(more.textContent== "MORE"){
    more.textContent="LESS"
  }
 else{
   more.textContent= "MORE"
 }
$day.textContent = `DAY OF THE WEEK: ${now.getDay()}`
$month.textContent = `DAY OF THE MONTH: ${now.getDate()}`
$year.textContent = `DAY OF THE YEAR: ${Math.ceil((today - new Date(today.getFullYear(),0,1)) / 86400000)}`
$weekyear.textContent = `WEEK OF THE YEAR: ${today.getWeek()}`
})

set.addEventListener("click", function() {
  setting.classList.toggle("setting")
})


setInterval(function time()  {
  const now = new Date()
  document.getElementById('now').innerHTML = now;
  
  console.log("seconds",$seconds)
 if($seconds == "true"){
  currenttime = now.toLocaleString().substring(10) 
  //currenttime = now.substring(9)
}
else{


    currenttime = `${now.getHours()}:${now.getMinutes()}`



  }

if($date == "true"){
  currentdate = now.toLocaleString().substring(0,9)
  //currenttime = now.substring(9)
}
else{
    currentdate = ''
}

  
  // console.log(currenttime)
  $time = document.getElementById('now')
  $time.textContent =currentdate  + " "+ currenttime
},100)

fetch('https://api.nasa.gov/planetary/apod?api_key=mcaKjx5hAZ49i6QBGKdeXdaAFth59OlWfraB4Xxr')
      .then(function(response){
          return response.json()
      })
  
        .then(function (imageData) {
            console.log(imageData)
            // if they are displaying a video instead of image.
            if (imageData.media_type === 'video') {
              document.body.style.backgroundImage = "url('https://miro.medium.com/max/1800/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg')";
                document.querySelector('h4').textContent = 'photo of the day is video'
            } else {    
               document.body.style.backgroundImage =`url(${imageData.url})`
                document.querySelector('p').textContent = imageData.explanation
            }
    





        })
        
       
 
  $settingform.addEventListener('submit', function (e) {
  e.preventDefault()
  setting.classList.toggle("setting")
  const elements = $settingform.elements
  console.log(elements)
  if(elements[0].checked == true) {
    $seconds = "true"
  }
 else{
  $seconds = "false"
 }

 if(elements[2].checked == true) {
  $date = "true"
}
else{
  $date = "false"
}


localStorage.setItem('seconds', $seconds);  
localStorage.setItem('date', $date);

})

console.log(now.getHours())

// //////////////////////////////////////////local storage ////////////////////////////////////////////////////

