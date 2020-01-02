showNotes();
// user adds a note, adding it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function(event){
      let addTxt = document.getElementById('addTxt');
      let addTitle = document.getElementById('addTitle');
      let notes = localStorage.getItem("notes");
      if(notes == null){
      	notesObj = [];
      }else{
      	notesObj = JSON.parse(notes);
      }
      let myObj = {
          title: addTitle.value,
          text: addTxt.value
      };
      notesObj.push(myObj);
      localStorage.setItem("notes",JSON.stringify(notesObj));
      addTxt.value="";
      addTitle.value="";
      showNotes();
});


// code to show all the notes added till now
function showNotes(){
	let notes = localStorage.getItem("notes");
	if(notes == null){
      	notesObj = [];
      }else{
      	notesObj = JSON.parse(notes);
      }
      let html = " ";
      notesObj.forEach(function(element,index){
          html = html + `<div class="noteCard my-2 mx-2 card" style="width: 18rem">
             		   <div class="card-body">
                              <h5 class="card-title">${index+1}. ${element.title}</h5>
                              <p class="card-text">${element.text}</p>
                              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                        </div>
             		
             	</div>`;
      });

      let notesElm = document.getElementById('notes');
      if(notesObj.length != 0){
      	notesElm.innerHTML = html;
      }else{
      	notesElm.innerHTML = "Add a Note section above to add notes.";
      }
}

// code to delete the note from added notes
function deleteNote(index){
  let notes = localStorage.getItem("notes");
  if(notes == null){
      notesObj = [];
  }else{
     notesObj = JSON.parse(notes);
  }

  notesObj.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
          let cardTxt = element.getElementsByTagName("p")[0].innerText;
          if(cardTxt.includes(inputVal)){
              element.style.display = "block";
          }else{
          	element.style.display = "none";
          }
    });
});

