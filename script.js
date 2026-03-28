function open() {
    let elem = document.querySelectorAll('.elems')
    let fullelem = document.querySelectorAll('.full-elem')
    let closebtn = document.querySelectorAll('.full-elem .close')

    elem.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullelem[elem.id].style.display = 'block'
        })
    })

    closebtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
            fullelem[btn.id].style.display = 'none'
        })
    })
}
open()

function todolist() {
    let form = document.querySelector('.addtask form')
    let inp = document.querySelector('.addtask form input')
    let textarea = document.querySelector('.addtask form textarea')
    let checkbox = document.querySelector('.addtask #subscribe')

    let currenttask = []

    if (localStorage.getItem('currenttask')) {
        currenttask = JSON.parse(localStorage.getItem('currenttask'))
    }

    function executetask() {
        let mytask = document.querySelector('.fulltask')
        let sum = ""

        currenttask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
                    <h4 class="task-title">${elem.task} ${elem.imp ? '🚨' : ''}</h4>
    
                    <button data-id="${idx}">Delete</button>
                </div>`
        })

        mytask.innerHTML = sum
        localStorage.setItem('currenttask', JSON.stringify(currenttask))


        // delete btn 
        document.querySelectorAll('.task button').forEach(function (buttn) {
            buttn.addEventListener('click', function () {
                let index = Number(buttn.getAttribute('data-id'))
                currenttask.splice(index, 1)
                executetask()
            })
        })
    }
    executetask()
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currenttask.push({
            task: inp.value,
            detials: textarea.value,
            imp: checkbox.checked
        })
        inp.value = ""
        textarea.value = ""
        checkbox.checked = false
        executetask()
    })
}

todolist()

function dailytask() {

    var dailyplandata = JSON.parse(localStorage.getItem("dailyplandata")) || {}
    let dayplanner = document.querySelector('.day-planner')

    let hours = Array.from({ length: 18 }, (elem, idu) => {
        return `${6 + idu}:00 -${7 + idu}:00`
    })


    let dailydata = ''


    hours.forEach(function (elem, iddx) {
        let saved = dailyplandata[iddx] || ''


        dailydata = dailydata + ` <div class="day-planner-time">
    <p>${elem}</p>
    <input id=${iddx} type="text" placeholder="Enter Plan" value=${saved}>
    </div>
    `

    })


    dayplanner.innerHTML = dailydata;




    let dayplannerinput = document.querySelectorAll('.day-planner input')


    dayplannerinput.forEach(function (elems) {
        elems.addEventListener('input', function () {
            dailyplandata[elems.id] = elems.value
            console.log(dailyplandata);


            localStorage.setItem('dailyplandata', JSON.stringify(dailyplandata))
        })

    })

}
dailytask()









async function api() {

    let quote = document.querySelector('.content p')
    let authorname = document.querySelector('.content .content2 h4')

    let responce = await fetch("https://api.quotable.io/quotes/random")

    let res = await responce.json()

    quote.innerHTML = res[0].content
    authorname.innerHTML = `- ${res[0].author}`
}
api()



function pomodorotime(){
    let totalsec = 30 * 60
let interval = null
let time = document.querySelector('.pomo-timer h1')
let start = document.querySelector('.pomo-timer .start')
let paused = document.querySelector('.pomo-timer .pause')
let reseted = document.querySelector('.pomo-timer .end')
let worksec = true
let work = document.querySelector('.work h4')

// console.log(totalsec);
function settime() {
    let minutes = Math.floor(totalsec / 60)
    let second = totalsec % 60
    // console.log(minutes,second );
    time.innerHTML = `${String(minutes).padStart('2', '0')}:${String(second).padStart('2', '0')}`
}

function starttime() {
    if (worksec) {
        work.innerHTML = 'Work-secssion'
        work.style.backgroundColor = 'rgb(179, 90, 34)'
        totalsec = 30 * 60
        clearInterval(interval)
        interval = setInterval(() => {
            if (totalsec > 0) {
                totalsec--
                settime()
            } else {
                worksec = false
                clearInterval(interval)
                work.innerHTML = 'break-time'
                time.innerHTML = '10:00'
            }
        }, 1000);
    } else {

        work.innerHTML = 'Break-secssion'
        work.style.backgroundColor = 'rgb(33, 94, 187)'
        clearInterval(interval)
        totalsec = 10 * 60
        interval = setInterval(() => {
            if (totalsec > 0) {
                totalsec--
                settime()
            } else {
                worksec = true
                clearInterval(interval)
                time.innerHTML = '30:00'
            }
        }, 1000);
    }



}

function pause() {
    clearInterval(interval)

}

function reset() {
    totalsec = 30 * 60
    clearInterval(interval)
    settime()
}

start.addEventListener('click', starttime)
paused.addEventListener('click', pause)
reseted.addEventListener('click', reset)
}
pomodorotime()





// daily task
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
render();

function addTask() {
  let input = document.getElementById('taskInput');
  let value = input.value.trim();
  if (value === '') return;

  tasks.push({ text: value, done: false });
  input.value = '';
  render();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

function render() {
  let list = document.getElementById('taskList');
  list.innerHTML = '';
  list.style.color = 'black';

  tasks.forEach((task, index) => {
    let li = document.createElement('li');
    if (task.done) li.classList.add('completed');

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <div class="actions">
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// ********





function weatherdata(){
    
let headerh2=document.querySelector('header h2')
let headerh3=document.querySelector('header h3')
let part2h3=document.querySelector('.part2 h3')
let part2h5=document.querySelectorAll('.part2 h5')
const key_api='e7fbaced941c4b74a0b112118262703'

const city='umarga'

let data=null

async function weatherapicalling(){
    let res= await fetch(` http://api.weatherapi.com/v1/current.json?key=${key_api}&q=${city} `)

    let data= await res.json()

    console.log(data.current.wind_kph);
    part2h3.innerHTML=`${data.current.temp_c}°C`
    part2h5[0].innerHTML=`Feels like: ${data.current.feelslike_c} °C`
    part2h5[1].innerHTML=`Humidity: ${data.current.humidity} %`
    part2h5[2].innerHTML=`wind: ${data.current.wind_kph} km/h`
}   
weatherapicalling()

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysofweeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let date=null

function getdate(){
date= new Date()

let week=daysofweeks[date.getDay()]
let hour=date.getHours().toString().padStart(2,'0')
let minute=date.getMinutes().toString().padStart(2,'0')
let sec=date.getSeconds().toString().padStart(2,'0')
let datee=date.getDate()
let month=months[date.getMonth()]
let year=date.getFullYear()

// headerh2.innerHTML=`${week},${hour}:${minute} pm`

headerh3.innerHTML=`${datee} ${month}, ${year}`
if(hour>12){
    
headerh2.innerHTML=`${week}, ${String(hour-12).padStart('2','0')}: ${minute}: ${sec} pm `
}
else{
    headerh2.innerHTML=` ${week} ,${hour}:${minute}: ${sec} am`
    
}

}
setInterval(() => {
    getdate()
}, 1000);

getdate()

}
weatherdata()




