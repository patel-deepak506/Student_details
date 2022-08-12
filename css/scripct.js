'use strict'

// selected elements for getting values
const formData = document.querySelector('.studentForm'); 

const rollElement =  document.getElementById('rollno');
const studentName = document.getElementById('name');
const subject = document.getElementById('subject');
var storage = document.getElementById('storage');
var storageType = document.querySelector('.storage_type');

const addDetails = document.querySelector('.mainList');

// selected elements for getting specific storage
const ls_el = document.getElementById('ls');
const ss_el = document.getElementById('ss');
// console.log(ls_el=="localStorage");

const submit =  document.querySelector('.submitButton');


submit.addEventListener('click' , function(e){
    // e.preventDefault()

    // Sending StudentData in localstorage , sessionstorages and cookies storages
    let rollValues = rollElement.value;
    const duplicateRoll =  JSON.parse(localStorage.getItem("mainlocal"))
    const duplicateRollSessson =  JSON.parse(sessionStorage.getItem("mainlocal"))
    if (duplicateRoll==null && "localStorage"==storage.value ) {
        const allItems =  JSON.parse(localStorage.getItem("mainlocal"))
        const mainLocal = {...allItems}
        const tempD = { rollNo:rollValues, 
                        studentName:studentName.value , 
                        subject:subject.value ,
                        storage:storage.value
                    }
        mainLocal[rollValues]=tempD;
        localStorage.setItem("mainlocal" , JSON.stringify(mainLocal)) 
        
    }else if("localStorage"===storage.value){
        
        if (rollValues in duplicateRoll || rollValues in duplicateRollSessson ) {
            alert("Same RollNo student is alredy enter please try another RollNo...")
        }else {
            const allItems =  JSON.parse(localStorage.getItem("mainlocal"))
            const mainLocal = {...allItems}
            const tempD = { rollNo:rollValues, 
                            studentName:studentName.value , 
                            subject:subject.value ,
                            storage:storage.value
                        }
            mainLocal[rollValues]=tempD;
            localStorage.setItem("mainlocal" , JSON.stringify(mainLocal)) 
        }
    }else if (duplicateRollSessson == null){
        const allItems =  JSON.parse(sessionStorage.getItem("mainlocal"))
        const mainLocal = {...allItems}
        const tempD = { rollNo:rollValues, 
                        studentName:studentName.value , 
                        subject:subject.value ,
                        storage:storage.value
                    }
        mainLocal[rollValues]=tempD;
        sessionStorage.setItem("mainlocal" , JSON.stringify(mainLocal)) 

    }else{ 
 
        if (rollValues in duplicateRollSessson || rollValues in duplicateRoll) {
            alert("Same RollNo student is alredy enter please try another RollNo...")
        }else {
            const allItems =  JSON.parse(sessionStorage.getItem("mainlocal"))
            // console.log(rollValues);
            const mainLocal = {...allItems}
            const tempD = { rollNo:rollValues, 
                            studentName:studentName.value , 
                            subject:subject.value ,
                            storage:storage.value
                        }
            mainLocal[rollValues]=tempD;
            sessionStorage.setItem("mainlocal" , JSON.stringify(mainLocal)) 
        }
    }
})

// Showing studentDetails By card..
// localstorages cardData

const getLocalstorgedata =JSON.parse(localStorage.getItem('mainlocal'))
for (let i in getLocalstorgedata ){
    i= getLocalstorgedata[i]
    let getRoll = i["rollNo"]
    let getStudent = i["studentName"]
    let getSubject = i["subject"]
    let getStorage = i["storage"]
          
    addDetails.innerHTML  += `<div class="studentCard">
    <div class="rollNo"> Rollno : <span class= "r">${getRoll}</span></div>
    <div class=" studentName">Name :<span class= "sName"> ${getStudent}</span></div>
    <div class="subjectName"> Subject :<span class= "ssubject"> ${getSubject}</span></div>
    <div class="storage"> Stograe :<span class= "sto"> ${getStorage}</span></div>
    <button class="editButton"> edit</button>
    <button class="deleteButton"> delete</button>
    </div>`
}


// Sessions Storages cardData
const getSeassonStorageData = JSON.parse(sessionStorage.getItem("mainlocal"));

for (let i in getSeassonStorageData ){
    i= getSeassonStorageData[i]
    let getRoll = i["rollNo"]
    let getStudent = i["studentName"]
    let getSubject = i["subject"]
    let getStorage = i["storage"]
          
    addDetails.innerHTML  += `<div class="studentCard">
    <div class="rollNo"> Rollno : <span class= "r">${getRoll}</span></div>
    <div class=" studentName">Name :<span class= "sName"> ${getStudent}</span></div>
    <div class="subjectName"> Subject :<span class= "ssubject"> ${getSubject} </span></div>
    <div class="storage"> Stograe :<span class= "sto"> ${getStorage} </span></div>
    <button class="editButton"> edit</button>
    <button class="deleteButton"> delete</button>
    </div>`

}


// const allStudents = document.querySelectorAll('.studentCard');
// let editButton = document.querySelectorAll('.editButton');

// delete data when click delete button..

let deleteButton = document.querySelectorAll('.deleteButton');
const deleteLocalstorgedata =JSON.parse(localStorage.getItem('mainlocal'))
for (let i = 0 ; i < deleteButton.length; i++) {
  let deleteBtn = deleteButton[i];

  deleteBtn.addEventListener('click' , function(){
        let p =  deleteBtn.parentElement;
        p.remove();
        let r =  p.querySelector('.r').textContent;
        dl_frlo(r) 
  })

}

function dl_frlo(roll_number) {
    let locaL_sto = JSON.parse(localStorage.getItem("mainlocal"));
    for(let i in locaL_sto){   
        if(Number(i) == Number(roll_number)){
            delete locaL_sto[i];
            localStorage.setItem("mainlocal" , JSON.stringify(locaL_sto));         
        }
    }
    let sesion_sto = JSON.parse(sessionStorage.getItem("mainlocal"));
    for(let i in sesion_sto){
        
        if(Number(i) == Number(roll_number)){
            delete sesion_sto[i];
            sessionStorage.setItem("mainlocal" , JSON.stringify(sesion_sto));         
        }
    }
}


// Edit Studentdetails 

let editButton = document.querySelectorAll('.editButton');
const editLocalstorgedata =JSON.parse(localStorage.getItem('mainlocal'))
for (let i = 0 ; i < editButton.length; i++) {
  let editBtn = editButton[i];
  editBtn.addEventListener('click' , function(){
        
    let p =  editBtn.parentElement;
    console.log(p);
    let rname = p.querySelector('.r').textContent;
    let sto = p.querySelector('.sto').textContent;
    // console.log( typeof sto);
    let sName = p.querySelector('.sName').textContent;
    let ssubject= p.querySelector('.ssubject').textContent;
   
    console.log(sto ==" localStorage");
    console.log("localStorage"  , "this is ckeck");
    console.log(sto);


    if (sto==" localStorage") {
         ls_el.selected ="true";
    }else {
        ss_el.selected = "true";
    }
    rollElement.value = rname;
    studentName.value = sName;
    subject.value = ssubject;
    // console.log(typeof(storage.value) ,  typeof(sto)  ,  storage.value  , sto)
    if (" localStorage" == sto ){

        let locaL_sto = JSON.parse(localStorage.getItem("mainlocal"));
        for(let i in locaL_sto){   
            if(Number(i) == Number(rollElement.value)){
                delete locaL_sto[i];
                localStorage.setItem("mainlocal" , JSON.stringify(locaL_sto));         
            }
        }
    } else {
        let sesion_sto = JSON.parse(sessionStorage.getItem("mainlocal"));
        for(let i in sesion_sto){
            
            if(Number(i) == Number(rollElement.value)){
                delete sesion_sto[i];
                sessionStorage.setItem("mainlocal" , JSON.stringify(sesion_sto));         
            }
        }
    }

  })
}