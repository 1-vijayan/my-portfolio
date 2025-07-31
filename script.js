const scriptURL = "https://script.google.com/macros/s/AKfycbx3WdgnBhGcUZT_azeVKzMbDJ9xyX4U43anb3_0ZPbm1SKx0n1rqcOKHaWhr7roF20v/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(form);

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      swal("Done", "Submitted Successfully.", "success");
    })
    .catch((error) => {
      swal("Error", "Something went wrong. Please try again!", "error");
    });
});
