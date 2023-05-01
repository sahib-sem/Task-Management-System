const modalEdit = document.querySelector(".edit-modal");
const modalAdd = document.querySelector(".add-modal");
const closeModalEditBtn = document.querySelector(".btn-close-edit");
const closeModalAddBtn = document.querySelector(".btn-close-add");



function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const addTaskBtn = document.querySelector('.addTask')
addTaskBtn.addEventListener('click', addTask)
async function addTask(){
    
    openModalAddTask()
    const url = 'http://localhost:3001/task/create'
    fetchRequest(url, 'POST' , 'add-submit')

}
async function loadTask(){
   let task = ``
   const url = 'http://localhost:3001/task'
   await fetch(url,{
    credentials:'include'
   })
   .then((res) => {
    return res.json()
   })
   .then((data) => {

    for (let element of data){
      element.dueDate = new Date(Date.parse(element.dueDate))
         
    task += 
    `<div class="task ${element.status? 'done-task':""}">
    <div class="task-container"  id = ${element.id}>
        <div class="task-detail">
            <h4 id="title">${element.title}</h4>
            <p id="description">${element.description}</p>
            <p id="duedate">${formatDate(element.dueDate)}</p>
        </div>
        <div class="button-container">
            <button class="btn2 done">${element.status ? 'open':'done'}</button>
            <button class="btn2 edit">edit</button>
            <button class="btn2 delete">delete</button>
        </div>
        
    </div>
    
</div>`

    }
   })

   const task_wrapper = document.querySelector(".task-wraper")
   if (task_wrapper){
    task_wrapper.innerHTML = task
   }

   const deleteBtn = document.querySelectorAll('.delete')
   if(deleteBtn){
    deleteBtn.forEach(element => {
      element.addEventListener('click' , deleteTask)
     });

   }
   const editBtn = document.querySelectorAll('.edit')
   if (editBtn){
   
    editBtn.forEach((element) =>{
     element.addEventListener('click' , editTask)
    })

   }
   const doneBtn = document.querySelectorAll('.done')
   if (doneBtn){
    doneBtn.forEach((element) =>{
      element.addEventListener('click' , toggleStatus)
     })

   }
   

 
  
}

loadTask()


const deleteTask = async (e) =>{
  const id = e.target.parentElement.parentElement.id
  const url = `http://localhost:3001/task/${id}`

  await fetch(url , {method: 'DELETE' , credentials:'include'})
  .then(res => res.json())
  .then(data => console.log(data))

  loadTask()


}

const fetchRequest = async (url, method , type) =>{
  var modal = (type == 'edit-submit') ? modalEdit : modalAdd
  var title = modal.querySelector('#title-modal')
  var description = modal.querySelector('#description-modal')
  var duedate = modal.querySelector('#duedate-modal')
  const submit = modal.querySelector('.' + type)
  const onSubmit = async () => {
    await fetch(url , {
      method: method ,
      credentials:'include',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        title:title.value,
        description:description.value,
        dueDate: formatDate(duedate.value), 
    } )
    }).then(res => res.json())
    .then(data=> console.log(data))
    
    if (type == 'edit-submit'){
      closeModalEdit()
    }else{
      closeModalAdd()
    }
    submit.removeEventListener('click', onSubmit);
    loadTask()
  };
  
  if (submit){
    
    submit.addEventListener('click', onSubmit);
  }
};
const editTask =  (e) =>{
  
  const id = e.target.parentElement.parentElement.id
  openModalEditTask(id)
  const url = `http://localhost:3001/task/${id}`
  fetchRequest(url, 'PATCH' , 'edit-submit')
  
 

}

const toggleStatus = async (e) =>{
  const id = e.target.parentElement.parentElement.id
  const url = `http://localhost:3001/task/${id}`
  const task = document.getElementById(id)
  const doneBtn = task.querySelector('.done')
  const status = (doneBtn.innerHTML == 'open') ? true : false
  doneBtn.innerHTML = (doneBtn.innerHTML == 'open')? 'done':'open'

  await fetch(url , {
    method:'PATCH',
    credentials:'include',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({
      status: !status
    })
  }).then(res => res.json())
  .then(data => console.log(data))

  loadTask()

}
const openModalAddTask = function () {
    modalAdd.classList.remove("hidden");
    clearModal();
    
  };

  const openModalEditTask = function(id){
    modalEdit.classList.remove("hidden");
    fillModal(id)


  }

  const clearModal = function(){
    var title = modalAdd.querySelector('#title-modal')
    var description = modalAdd.querySelector('#description-modal')
    var duedate = modalAdd.querySelector('#duedate-modal')
    title.value = ''
    description.value = ''
    duedate.value = ''
  }

  const fillModal = function(id){
    var task = document.getElementById(String(id))
    var title = task.querySelector('#title')
    var description = task.querySelector('#description')
    var duedate = task.querySelector('#duedate')
    var title_input = modalEdit.querySelector('#title-modal')
    var description_input = modalEdit.querySelector('#description-modal')
    var duedate_input = modalEdit.querySelector('#duedate-modal')
    let date = formatDate(duedate.innerHTML)
    title_input.value = title.innerHTML
    description_input.value = description.innerHTML
    duedate_input.value = date
    


  }

  const closeModalEdit = function () {
    modalEdit.classList.add("hidden");
  };
  const closeModalAdd = function () {
    modalAdd.classList.add("hidden");
  };

  
  closeModalEditBtn.addEventListener("click", closeModalEdit);
  closeModalAddBtn.addEventListener("click", closeModalAdd);