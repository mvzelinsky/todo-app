const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST = [],
id = 0;

//get the item from the local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
        LIST = JSON.parse(data);
        id = LIST.length;
        loadList(LIST); 
}else{
        //if data isn't empty
        LIST = [];
        id = 0;
}

//load items to the user's interface

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}


//add item to the local storage
localStorage.setItem("TODO", JSON.stringify(LIST));

//show current date

const today = new Date();
const options = {weekday: "long", month: "long", day:"numeric"};

dateElement.innerHTML = today.toLocaleDateString("en", options);

// add to do

function addToDo(toDo, id, done, trash){

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
    <li class = "item">
        <i class="fa ${DONE} complete" job = "complete" id="${id}"></i>
        <p class="text ${LINE}" >${toDo}</p>
        <i class="far fa-edit edit"></i>
        <i class="fa fa-trash-o delete" job = "delete" id="${id}"></i>
    </li>`

    const position = "beforeend"; 
    list.insertAdjacentHTML(position, item);
}

//add by the key pressed

document.addEventListener("keyup", function(even){

    if(event.keyCode == 13){
            const toDo = input.value;

            if(toDo){
                addToDo(toDo, id, false, false);

                LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });

                id++;

                //add item to the local storage
                localStorage.setItem("TODO", JSON.stringify(LIST));
            }
            input.value = "";
    }
});

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}



list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element)
    };

    if(elementJob == "delete"){
        removeToDo(element)
    };

    //add item to the local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));

});


