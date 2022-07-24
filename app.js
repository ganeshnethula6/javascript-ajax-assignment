let mode;
let stuId;
function showData(responseText) {
    document.getElementById("table").innerHTML=``;
    var table=`
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
    let data=JSON.parse(responseText);
    console.log(Array.isArray(data));
    data.forEach((value,index) => {
           table+=   `
            <tr>
              <td>${value.stuId}</td>
              <td>${value.firstName}</td>
              <td>${value.lastName}</td>
              <td>${value.email}</td>
              <td>${value.phoneNumber}</td>
              <td onclick="updateUser(${value.stuId})"><i class="fa fa-edit"></i></td>
              <td ><i class="fa fa-trash"></i></td>
          </tr>  ` ;
    });
  document.getElementById("table").innerHTML=table;
};
function displayUsers()
{
          var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         showData(this.responseText);
      }
    }
    xhttp.open("GET","https://62dd2df057ac3c3f3c65bf19.mockapi.io/api/v1/students",true);
    xhttp.send();
}
function updateUser(id){
    stuId=id;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.readyState ,this.status );
        console.log(this.responseText);
        // var user=this.responseText;
        // document.getElementById("form").style.display="block";
        // document.getElementById("firstName").value=user.firstName;
        // document.getElementById("lastLast").value=user.lastName;
        // document.getElementById("email").value=user.email;
        // document.getElementById("phn").value=user.phoneNumber;
        if (this.readyState == 4 && this.status == 200) {
            var user=JSON.parse(this.responseText);
            console.log(typeof user);
            console.log(Array.isArray(user) );
            document.getElementById("form").style.display="block";
            document.getElementById("firstName").value=user.firstName;
            document.getElementById("lastLast").value=user.lastName;
            document.getElementById("email").value=user.email;
            document.getElementById("phn").value=user.phoneNumber; 
        }
        };
    xhttp.open("PUT",`https://62dd2df057ac3c3f3c65bf19.mockapi.io/api/v1/students/${stuId}`,true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
    mode="updateuser";

}
function addUser() {
    document.getElementById("form").style.display="block";
    mode="adduser";
       }
    function getDetails(){
        if(mode=='adduser'){
            document.getElementById("form").style.display="block";
            var firstName=document.getElementById("firstName").value;
            var lastName=document.getElementById("lastLast").value;
            var email=document.getElementById("email").value;
            var phoneNumber=document.getElementById("phn").value;
            var user= {
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "phoneNumber":phoneNumber
            };
            console.log(user);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                console.log(this.readyState ,this.status );
                console.log(this.responseText);
            if (this.readyState == 4 && this.status == 201) {
                displayUsers()
            }
            };
            xhttp.open("POST", "https://62dd2df057ac3c3f3c65bf19.mockapi.io/api/v1/students", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(user));
            
        }else  if(mode=='updateuser'){
           
        }

    }