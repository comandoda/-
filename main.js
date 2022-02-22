
let footerInput = document.querySelector(".footer_input")
let footerButton = document.querySelector(".footer_button")
let taskList = []
let tabs = document.querySelectorAll(".tabs div")
let mode = "all"
let filterList = []


for(let i=0; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)})
}


footerInput.addEventListener("click", taskReset)
footerButton.addEventListener("click", addTask);


function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: footerInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)
    render()
}

function render() {
    let resultHTML = ""
    let list = [];
    if(mode == "all") {
        list = taskList
    }else if(mode == "ongoing" || mode == "done") {
        list = filterList
    }
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += ` <div class="item">
            <span class="item_name">${list[i].taskContent}</span>
            <div class="button_area">
            <button onclick="toggleComplete('${list[i].id}')" class="item_check">
                <i class="fa-solid fa-circle-check"></i>
            </button>
            <button onclick="deleteComplete('${list[i].id}')" class="item_delete">
                <i class="fa-solid fa-trash-can"></i>
            </button>
            </div>
            </div>
            <div class="divider"></div>`
        }else {
            resultHTML += ` <div class="item">
            <span>${list[i].taskContent}</span>
            <div class="button_area">
            <button onclick="toggleComplete('${list[i].id}')" class="item_check">
                <i class="fa-solid fa-circle-check"></i>
            </button>
            <button onclick="deleteComplete('${list[i].id}')" class="item_delete">
                <i class="fa-solid fa-trash-can"></i>
            </button>
            </div>
            </div>
            <div class="divider"></div>`
        }
        
    }

    document.querySelector(".items_row").innerHTML = resultHTML
}

function randomIDGenerate () {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete
        }
    }
    console.log(taskList)
    render()
}

function deleteComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)
        }
    }
    console.log(taskList)
    render()
}

function filter(event) {
    filterList = []
    mode = event.target.id
    for(let i=0; i<taskList.length; i++) {
        if(mode == "all") {
            render()
        }else if(mode == "ongoing") {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }render()
        }else if(mode == "done") {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i])
            }
        }render()
    }
}

function taskReset () {
    footerInput.value = ''
}