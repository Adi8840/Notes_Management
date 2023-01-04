console.log("Hi this is js");
showNotes();
let btnid = document.getElementById("addbtn");
btnid.addEventListener("click", function (e) {
    let adddata = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let newObj = {
        text: adddata.value,
        title: addtitle.value
    }
    noteObj.push(newObj);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    adddata.value = "";
    addtitle.value = "";
    console.log(noteObj);

    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let html = "";
    noteObj.forEach(function (element, index) {
        html += `
        <div class="note mx-2 my-2" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Remove</button>
            </div>
        </div>`;
    });
    let noteEle = document.getElementById("notes");
    if (noteObj.length != 0) {
        noteEle.innerHTML = html;
    }
    else {
        noteEle.innerHTML = "Nothing to Show!";
    }
}

function deleteNode(index) {
    //console.log("Deleted", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    showNotes();
}

let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
    //console.log("Node is searched");
    let inp = search.value.toLowerCase();
    let notecard = document.getElementsByClassName("note");
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(inp)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})