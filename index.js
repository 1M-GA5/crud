const form = document.querySelector("#booking-form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const obj ={
    name : document.querySelector("#name").value,
    email : document.querySelector("#email").value,
    phone : document.querySelector("#phone").value
  }

  let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
  submissions.push({ name, email, phone });
  axios.post("https://crudcrud.com/api/fad93ec725734a308bcd8f2649264ecb/crud",obj).then
  ((respone)=>{
    console.log(respone)
  })
  .catch((err)=>{
    console.log(err)
  })
  alert("Booking confirmed! Details stored in local storage.");
  updateStoredDataDisplay();
});

function updateStoredDataDisplay() {
  const storedDataContainer = document.querySelector("#stored-data");
  storedDataContainer.innerHTML = "";
  const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
  submissions.forEach((submission, index) => {
    storedDataContainer.innerHTML += `
      <p>
        Name: ${submission.name} |
        Email: ${submission.email} |
        Phone: ${submission.phone}
        <button class="edit-button" data-index="${index}">Edit</button>
        <button class="delete-button" data-index="${index}">Delete</button>
      </p>
    `;
  });

  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach(button => {
    button.addEventListener("click", function() {
      const index = Number(this.dataset.index);
      const submissions = JSON.parse(localStorage.getItem("submissions"));
      const submission = submissions[index];
      document.querySelector("#name").value = submission.name;
      document.querySelector("#email").value = submission.email;
      document.querySelector("#phone").value = submission.phone;
      localStorage.setItem("selectedIndex", index);
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(button => {
    button.addEventListener("click", function() {
      const index = Number(this.dataset.index);
      const submissions = JSON.parse(localStorage.getItem("submissions"));
      submissions.splice(index, 1);
      localStorage.setItem("submissions", JSON.stringify(submissions));
      updateStoredDataDisplay();
    });
  });
}

updateStoredDataDisplay();
