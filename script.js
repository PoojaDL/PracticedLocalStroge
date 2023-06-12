var formElement=document.querySelector('.form')
var nameInput=document.querySelector('.name')
var emailInput=document.querySelector('.email')
var itemDetail=document.querySelector('.item-list')

formElement.addEventListener('submit',formSubmit)
var i=0;

function createElement(){
  var items={
    name:nameInput.value,
    email:emailInput.value
  }
  localStorage.setItem("item"+i,JSON.stringify(items))
  i++;
}

window.addEventListener("DOMContentLoaded", ()=>{
  for(const[key,value] of Object.entries(localStorage)){
    let li=document.createElement("li")
    li.textContent=JSON.parse(value).name+":"+JSON.parse(value).email;
    createButtons(li)
    itemDetail.appendChild(li)
  }
})

function formSubmit(e){
  e.preventDefault();
  createElement()
  display()
  nameInput.value=""
  emailInput.value=""
}

function display(){
  let li=document.createElement("li")
  li.textContent=nameInput.value+":"+emailInput.value;
  createButtons(li)
  itemDetail.appendChild(li)
}

function createButtons(li){
  let deletebtn=document.createElement("button");
  deletebtn.textContent="delete"
  deletebtn.addEventListener('click',deleteElement)
  let editbtn=document.createElement("button");
  editbtn.textContent="edit"
  editbtn.addEventListener('click',editElement)
  li.append(deletebtn,editbtn)
}

function editElement(e){
  let li=e.target.parentElement;
  for(const[key,value] of Object.entries(localStorage)){
    let localStorageText=JSON.parse(value).name+":"+JSON.parse(value).email;
    if(localStorageText==li.firstChild.textContent){
      nameInput.value=JSON.parse(value).name;
      emailInput.value=JSON.parse(value).email;
      localStorage.removeItem(key)
      itemDetail.removeChild(li)
      break;
    }
  }
}

function deleteElement(e){
  let li=e.target.parentElement;
  for(const[key,value] of Object.entries(localStorage)){
    let localStorageText=JSON.parse(value).name+":"+JSON.parse(value).email;
    if(localStorageText==li.firstChild.textContent){
      localStorage.removeItem(key)
      itemDetail.removeChild(li)
      break;
    }
  }
}
