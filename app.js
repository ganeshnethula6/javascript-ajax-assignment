let mode;
let stuId;
function showData(responseText) {
  document.getElementById("table").innerHTML = ``;
  var table = `
    <tr>
    <th>Student Id</th>
    <th> First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Phone Number</th>
    <th>Update</th>
    <th>Delete</th>
</tr>
    `;
  let data = JSON.parse(responseText);
  console.log(Array.isArray(data));
  data.forEach((value, index) => {
    table += `
            <tr>
              <td>${value.stuId}</td>
              <td>${value.firstName}</td>
              <td>${value.lastName}</td>
              <td>${value.email}</td>
              <td>${value.phoneNumber}</td>
              <td onclick="updateUser(${value.stuId})"><i class="fa fa-edit"></i></td>
              <td onclick="deleteUser(${value.stuId})"><i class="fa fa-trash"></i></td>
          </tr>  `;
  });
  document.getElementById("table").innerHTML = table;
}
function displayUsers() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      showData(this.responseText);
    }
  };
  xhttp.open(
    "GET",
    "https://62dd2df057ac3c3f3c65bf19.mockapi.io/api/v1/students",
    true
  );
  xhttp.send();
}
function updateUser(id) {
  stuId = id;
  mode = "updateuser";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var user = JSON.parse(this.responseText);
      document.getElementById("studentInput").style.display = "block";
      document.getElementById("form").style.display = "block";
      document.getElementById("stuId").value = user.stuId;
      document.getElementById("firstName").value = user.firstName;
      document.getElementById("lastLast").value = user.lastName;
      document.getElementById("email").value = user.email;
      document.getElementById("phn").value = user.phoneNumber;
    }
  };
  xhttp.open(
    "GET",
    "https://62dd2df057ac3c3f3c65bf19.mockapi.io/api/v1/students/" + id,
    true
  );
  xhttp.send();

  mode = "updateuser";
}
function addUser() {
  document.getElementById("studentInput").style.display = "none";
  document.getElementById("form").style.display = "block";
  mode = "adduser";
}
function getDetails() {
  var error = document.getElementById("errorMsg");
  var val = validate();
  if (!val) {
    // error.style.display = "block";
    // error.innerHTML = `Error: Student ID ${id} is not found please enter correct student id.`;
    return;
  }
  error.style.display = "none";
  var error = document.getElementById("errorMsg");
  var id = document.getElementById("stuId").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phn").value;
  var user = {
    stuId: stuId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
  };
  if (mode == "adduser") {
    console.log(user);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 201) {
        displayUsers();
      }
    };
    xhttp.open(
      "POST",
      "https://62dd2df057ac3c3f3c65bf19.mockapi.io/api/v1/students",
      true
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
  } else if (mode == "updateuser") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("errorMsg").style.display = "none";
        displayUsers();
      } else if (this.status == 404) {
        var error = document.getElementById("errorMsg");
        error.style.display = "block";
        error.innerHTML = `Error: Student ID ${id} is not found please enter correct student id.`;
      }
    };
    xhttp.open(
      "PUT",
      `https://62dd2df057ac3c3f3c65bf19.mockapi.io/api/v1/students/${id}`,
      true
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
  }
}
function deleteUser(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      displayUsers();
    }
  };
  xhttp.open(
    "DELETE",
    `https://62dd2df057ac3c3f3c65bf19.mockapi.io/api/v1/students/${id}`,
    true
  );
  xhttp.send();
}

function validate() {
  var firstName = document.getElementById("firstName").value.trim();
  var lastName = document.getElementById("lastName").value.trim();
  var email = document.getElementById("email").value.trim();
  var mobileNumber = document.getElementById("phn").value.trim();
  fres = validateFirstName(firstName);
  lres = validateLastName(lastName);
  eres = validateEmail(email);
  pres = validatePhoneNumber(mobileNumber);
  if (fres && lres && eres && pres) {
    return true;
  } else {
    return false;
  }
}

function validateFirstName(firstNameValue) {
  firstNameValue = firstNameValue;
  const firstNamePattern = /[^A-z]/g.test(firstNameValue);
  if (firstNameValue == "") {
    document.getElementById("fnErrorMsg").innerHTML =
      "First name shouldn't be blank";
    return false;
  } else if (firstNamePattern) {
    document.getElementById("fnErrorMsg").innerHTML =
      "please enter the only text";
    return false;
  } else {
    document.getElementById("fnErrorMsg").innerHTML = "";
    return true;
  }
}
function validateLastName(lastNameValue) {
  lastNameValue = lastNameValue.trim();
  const lastNamePattern = /[^A-z]/g.test(lastNameValue);
  if (lastNameValue == "") {
    document.getElementById("lnErrorMsg").innerHTML =
      "last name shouldn't be blank";
    return false;
  } else if (lastNamePattern) {
    document.getElementById("lnErrorMsg").innerHTML =
      "please enter the only text";
    return false;
  } else {
    document.getElementById("lnErrorMsg").innerHTML = "";
    return true;
  }
}
function validatePhoneNumber(phoneNumberValue) {
  phoneNumberValue = phoneNumberValue.trim();
  const phoneNumberPattern = /^[0]?[6789]\d{9}/g.test(phoneNumberValue);
  if (phoneNumberValue == "") {
    document.getElementById("pnErrorMsg").innerHTML =
      "phone Number shouldn't be blank";
    return false;
  } else if (!phoneNumberPattern) {
    document.getElementById("pnErrorMsg").innerHTML =
      "start with 9/8/7/6 length should be 10";
    return false;
  } else {
    document.getElementById("pnErrorMsg").innerHTML = "";
    return true;
  }
}

function validateEmail(emailValue) {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    emailValue
  );
  if (emailValue == "") {
    document.getElementById("emailErrorMsg").innerHTML =
      "email shouldn't be blank";
    return false;
  } else if (!emailPattern) {
    document.getElementById("emailErrorMsg").innerHTML =
      "please enter correct email pattern";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
}
