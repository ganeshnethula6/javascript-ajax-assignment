# javascript-ajax-assignment
Instructions
Please create a simple web application with 2 pages.

View Users
Add Users
Edit an user
Delete an user
View Users Page:

The list of users should be displayed in a tabular format
We should have an edit & delete icon against each row at the right end
By clicking on the edit button, that particular row in the table must be editable directly. The same should be saved on hitting the enter button
By clicking on the delete icon, a confirmation popup should come up and delete the row if the user agrees. 
Add Users Page:

Create an HTML form to collect the user info and save it when the form is submitted 
Notes:

Use can use https://mockapi.io/ for creating the mock API. It is not necessary to only use this tool. You can use any alternative tool as well.   
Sample code on JavaScript  for the HTTP request:

function fetchUsers() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
loadUsers(this.responseText);
}
};
xhttp.open("GET", "https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users", true);
xhttp.send();
}
function addUser() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
document.getElementById("demo").innerHTML = this.responseText;
}
};
xhttp.open("POST", "https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send(JSON.stringify({"id":"U00001","userName":"Sridharan","age":21,"state":"Maharashtra"}));
}
function updateUser() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
document.getElementById("demo").innerHTML = this.responseText;
}
};
xhttp.open("PUT", "https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users/78", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send(JSON.stringify({"state":"Tamilnadu"}));
}
function deleteUser() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
document.getElementById("demo").innerHTML = this.responseText;
}
};
xhttp.open("DELETE", "https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users/77", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();
}
