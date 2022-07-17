const addBox= document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
closeIcon= popupBox.querySelector('header i'),
addBtn = popupBox.querySelector('button'),
titleTag = popupBox.querySelector('input'),
descTag = popupBox.querySelector('textarea'),
popupTitle= popupBox.querySelector('header p');


const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];

// getting local storage notes if exist and parsing them ti JS object or passing them into an empty array
const notes = JSON.parse(localStorage.getItem('notes') || '[]');

let isUpdate = false, updateId;

function showNotes(){
    if(!notes) return;
    document.querySelectorAll('.note').forEach(note=>note.remove());
    notes.forEach((note, index)=>{
        // console.log(note);
        let liTag = `
             <li class="note">
                <div class="details">
                    <p>${note.title}</p>
                    <span>
                        ${note.description}
                    </span>
                </div>
                <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                        <i onclick='showMenu(this)' class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                        <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>
        `
        addBox.insertAdjacentHTML('afterend', liTag);
    })
};

showNotes();

function showMenu(elem){
    // console.log(elem)
    elem.parentElement.classList.add('show');
    document.addEventListener('click',e =>{ // removing the menu when clicking any place on the screen 
        if (e.target.tagName != 'I' || e.target != elem){
            elem.parentElement.classList.remove('show');
        }
    });
};

function deleteNote(noteId){
    // console.log(noteId);
    let confirmDel = confirm('Are you sure you want to delete this note!');
    if (!confirmDel) return;
    notes.splice(noteId, 1); // removing the selected note from the array of tasks
    localStorage.getItem('notes', JSON.stringify(notes)); // saving the array update
    showNotes();
};

function updateNote(noteId, title, desc){
    // console.log(noteId, title, desc);
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerHTML = 'Update Note';
    popupTitle.innerText = 'Update a Note';

};

addBox.addEventListener('click',()=>{
    titleTag.focus();
    popupBox.classList.add('show');
     popupTitle.innerText = "Add a new Note";
     addBtn.innerText = "Add Note";   
});

closeIcon.addEventListener('click',()=>{
    isUpdate= false;
    titleTag.value='';
    descTag.value='';
    popupBox.classList.remove('show');
     document.querySelector('body').style.overflow='auto'
});

addBtn.addEventListener('click',e =>{
    e.preventDefault();
    let noteTitle = titleTag.value ,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${day} ${month} ${year}`,
        }
        if(!isUpdate){
            notes.push(noteInfo); // adding a new note
        }else{
            isUpdate = false;
            notes[updateId] = noteInfo; //updating a specific note
        }
        // console.log(noteInfo);
        localStorage.setItem('notes', JSON.stringify(notes)); // saving all the noted to a local storage
        closeIcon.click();
        showNotes();
    }
});
