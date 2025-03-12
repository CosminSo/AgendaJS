document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const addButton = document.getElementById("addBtn");
  const contactsTable = document
    .getElementById("contactsTable")
    .getElementsByTagName("tbody")[0];
  let editIndex = null;

  window.addOrUpdateContact = function () {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name === "" || phone === "") {
      alert("Completați toate câmpurile!");
      return;
    }

    if (editIndex !== null) {
      updateContact(name, phone);
    } else {
      addContact(name, phone);
    }

    resetForm();
  };

  function addContact(name, phone) {
    const row = contactsTable.insertRow();
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = phone;

    const editCell = row.insertCell(2);
    const editBtn = document.createElement("button");
    editBtn.textContent = "Modifica";
    editBtn.onclick = function () {
      editContact(row, name, phone);
    };
    editCell.appendChild(editBtn);

    const deleteCell = row.insertCell(3);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sterge";
    deleteBtn.onclick = function () {
      deleteContact(row);
    };
    deleteCell.appendChild(deleteBtn);
  }

  function editContact(row, name, phone) {
    nameInput.value = name;
    phoneInput.value = phone;
    editIndex = row.rowIndex - 1;
    addButton.textContent = "Actualizeaza Contact";
  }

  function updateContact(name, phone) {
    contactsTable.rows[editIndex].cells[0].textContent = name;
    contactsTable.rows[editIndex].cells[1].textContent = phone;
    editIndex = null;
    addButton.textContent = "Adauga Contact";
  }

  function deleteContact(row) {
    contactsTable.deleteRow(row.rowIndex - 1);
  }

  function resetForm() {
    nameInput.value = "";
    phoneInput.value = "";
    editIndex = null;
    addButton.textContent = "Adauga Contact";
  }
});
