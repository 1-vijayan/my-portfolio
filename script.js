document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Menu Toggle
  const header = document.querySelector("header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelectorAll("#navMenu a");

  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      header.classList.toggle("nav-active");
    });
  }

  // Close menu when a navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (header) {
        header.classList.remove("nav-active");
      }
    });
  });

  // Google Sheet Form Submission Handler
  const scriptURL = "https://script.google.com/macros/s/AKfycbx3WdgnBhGcUZT_azeVKzMbDJ9xyX4U43anb3_0ZPbm1SKx0n1rqcOKHaWhr7roF20v/exec";
  const form = document.forms["submit-to-google-sheet"];

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Select submit button to show loading state
      const submitBtn = form.querySelector(".submit-btn");
      let originalBtnContent = "Submit Form";
      if (submitBtn) {
        originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      }

      var formData = new FormData(form);

      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
          if (typeof swal !== "undefined") {
            swal("Done", "Submitted Successfully.", "success");
          } else {
            alert("Submitted Successfully!");
          }
          form.reset();
        })
        .catch((error) => {
          console.error("Submission error:", error);
          if (typeof swal !== "undefined") {
            swal("Error", "Something went wrong. Please try again!", "error");
          } else {
            alert("Something went wrong. Please try again!");
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
          }
        });
    });
  }
});
