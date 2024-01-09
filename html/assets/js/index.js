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

function ChangeImage(){
  const fileUpload = document.querySelector("#file-upload");
  fileUpload.addEventListener("change", (event) => {
      const { files } = event.target;
      console.log(fileUpload.files[0].name);
      document.getElementById("image").src = "../images/" + fileUpload.files[0].name;
      console.log(fileUpload.files[0].name);
  })
}
Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});
