

// edit and save 
function edit() {
    for (let i = 0; i < 8; i++) {
        document.querySelectorAll("form .form-control")[i].readOnly = false;
    }
}
function save() {
    var xs = [];
    for (let i = 0; i < 8; i++) {
        var x = document.querySelectorAll("form .form-control")[i].value;
        xs.push(x);
        document.querySelectorAll("form .form-control")[i].value = xs[i];
        document.querySelectorAll("form .form-control")[i].readOnly = true;
    }
}
window.onload = edit();

// change photo
function ChangeImage(){
    const fileUpload = document.querySelector("#file-upload");
    fileUpload.addEventListener("change", (event) => {
        const { files } = event.target;
        console.log(fileUpload.files[0].name);
        document.getElementById("image").src = "../img/" + fileUpload.files[0].name;
        console.log(fileUpload.files[0].name);
    })

}
function ShowPopUpAdding() {
    alert("Tạo thành công");
  }

function validateForm() {
    let x = document.forms["myForm"]["keyword"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
    console.log(123);
  }
