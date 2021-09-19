var urlBase = 'http://mycontactspace.com/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginEmail").value;
	var password = document.getElementById("loginPassword").value;
	//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	var tmp = {
		Login: login,
		Password: password
	};

//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );
	
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contacts.php";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doRegister()
{
        userId = 0;
        firstName = "";
        lastName = "";
		
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var login = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPassword").value;
        // var hash = md5( password );

        //document.getElementById("loginResult").innerHTML = "";

        var tmp = {
                FirstName: firstName,
                LastName: lastName,
                Login: login,
                Password: password
        };

		// var tmp = {login:login,password:hash};
        var jsonPayload = JSON.stringify( tmp );

        var url = urlBase + '/AddUser.' + extension;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try
        {
                xhr.onreadystatechange = function()
                {
                        if (this.readyState == 4 && this.status == 200)
                        {
                                var jsonObject = JSON.parse( xhr.responseText );
                                userId = jsonObject.id;

                                if( userId < 1 )
                                {
                                        document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                                        return;
                                }

                                firstName = jsonObject.firstName;
                                lastName = jsonObject.lastName;

                                saveCookie();

                                window.location.href = "contacts.php";
                        }
                };
                xhr.send(jsonPayload);
        }
        catch(err)
        {
                document.getElementById("loginResult").innerHTML = err.message;
        }

}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	var newFirstName = document.getElementById("firstName").value;
	var newLastName = document.getElementById("lastName").value;
	var newPhoneNumber = document.getElementById("contactsPhoneNumber").value;
	var newEmail = document.getElementById("contactsEmail").value;
	var newNotes = document.getElementById("contactsNotes").value;
	//var newColor = document.getElementById("colorText").value;
	//document.getElementById("colorAddResult").innerHTML = "";

	//var tmp = { 
	//	color: newColor, userId, userId
	//};
	var tmp = {
		FirstName: newFirstName,
		LastName: newLastName,
		PhoneNumber: newPhoneNumber,
		EmailAddress: newEmail,
		Notes: newNotes
	};

	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
	setTimeout(location.reload.bind(location), 300);
}

/*  COMMENT OUT ALL CODE THAT IS CURRENTLY NOT BEING USED TO AVOID WEBPAGE NOT WORKING
function searchColor()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	var colorList = "";

	var tmp = {search:srch,userId:userId};
	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/SearchColors.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}
*/

/* Add contacts functionality */

let btnAdd = document.getElementById("addButton");
let table = document.getElementById("tableBody");

let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let phoneNumberInput = document.getElementById("contactsPhoneNumber");
let emailInput = document.getElementById("contactsEmail");
let notesInput = document.getElementById("contactsNotes");

btnAdd.addEventListener('click', () => {
	// Increment ID values
	//let countID = document.querySelector('table :last-child > :last-child > th');
	//let numberID = parseInt(countID.innerHTML) + 1;

    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let phoneNumber = phoneNumberInput.value;
    let email = emailInput.value;
    let notes = notesInput.value;

	var table = document.getElementById("contactsTable");
	var tableLength = (table.rows.length) - 1;

	var tmp = {
		FirstName: firstName,
		LastName: lastName,
		PhoneNumber: phoneNumber,
		Email: email,
		Notes: notes
	};

	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("colorAddResult").innerHTML = err.message;
	}
/*
	// Make a new row in the table
    let template = `
				<?php
					while($rows=$result->fetch_assoc())
					{
				?>
				<tr id="row${tableLength}">
					<td><?php echo $rows['FirstName'];?></td>
					<td><?php echo $rows['PhoneNumber'];?></td>
					<td><?php echo $rows['EmailAddress'];?></td>
					<td><?php echo $rows['Notes'];?></td>
				</tr>
				<?php
					}
				?>`;

    table.innerHTML += template;
*/
	clearInput();
});
/*
<tr id="row${tableLength}">
                    <th scope="row">${tableLength}</th>
                    <td id="name-row${tableLength}">${firstName} ${lastName}</td>
                    <td id="phoneNumber-row${tableLength}">${phoneNumber}</td>
                    <td id="email-row${tableLength}">${email}</td>
                    <td id="notes-row${tableLength}">${notes}</td>
                    <td id="button-cell">
                      <button type="button" id="edit-button${tableLength}" value="Edit" class="btn btn-light edit" onclick="edit_row('${tableLength}')">Edit</button>
                      <button type="button" id="save-button${tableLength}" value="Save" class="btn btn-light save" onclick="save_row('${tableLength}')" style="display:none;">Save</button>
                      <button type="button" value="Delete" class="btn btn-danger delete" onclick="delete_row('${tableLength}')">Delete</button>
                    </td>
                </tr>
*/
function clearInput()
{
	document.getElementById("firstName").value = '';
	document.getElementById("lastName").value = '';
	document.getElementById("contactsPhoneNumber").value = '';
	document.getElementById("contactsEmail").value = '';
	document.getElementById("contactsNotes").value = '';
}

/* Edit, save, and delete contacts */

function edit_row(no)
{
 document.getElementById("edit-button"+no).style.display="none";
 document.getElementById("save-button"+no).style.display="inline-flex";
	
 var firstName = document.getElementById("firstName-row"+no);
 var lastName = document.getElementById("lastName-row"+no);
 var phoneNumber = document.getElementById("phoneNumber-row"+no);
 var email = document.getElementById("email-row"+no);
 var notes = document.getElementById("notes-row"+no);
	
 var firstName_data = firstName.innerHTML;
 var lastName_data = lastName.innerHTML;
 var phoneNumber_data = phoneNumber.innerHTML;
 var email_data = email.innerHTML;
 var notes_data = notes.innerHTML;
 
 firstName.innerHTML="<input type='text' id='firstName-text"+no+"' value='"+firstName_data+"'> ";
 lastName.innerHTML="<input type='text' id='lastName-text"+no+"' value='"+lastName_data+"'>";
 phoneNumber.innerHTML="<input type='text' id='phoneNumber-text"+no+"' value='"+phoneNumber_data+"'>";
 email.innerHTML="<input type='text' id='email-text"+no+"' value='"+email_data+"'>";
 notes.innerHTML="<input type='text' id='notes-text"+no+"' value='"+notes_data+"' maxlength = '100'>";
}

function save_row(no)
{
	/*
	var name_val=document.getElementById("name-text"+no).value;
	var phoneNumber_val=document.getElementById("phoneNumber-text"+no).value;
	var email_val=document.getElementById("email-text"+no).value;
	var notes_val=document.getElementById("notes-text"+no).value;
	*/
	var contactID = no;
	var newFirstName = document.getElementById("firstName-text"+no).value;
	var newLastName = document.getElementById("lastName-text"+no).value;
	var newPhoneNumber = document.getElementById("phoneNumber-text"+no).value;
	var newEmail = document.getElementById("email-text"+no).value;
	var newNotes = document.getElementById("notes-text"+no).value;

	var tmp = {
		ID: contactID,
		FirstName: newFirstName,
		LastName: newLastName,
		PhoneNumber: newPhoneNumber,
		EmailAddress: newEmail,
		Notes: newNotes
	};

	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/UpdateContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("colorAddResult").innerHTML = err.message;
	}

/*
 document.getElementById("name-row"+no).innerHTML=newFirstName;
 document.getElementById("phoneNumber-row"+no).innerHTML=newPhoneNumber;
 document.getElementById("email-row"+no).innerHTML=email_val;
 document.getElementById("notes-row"+no).innerHTML=notes_val;
*/
 document.getElementById("edit-button"+no).style.display="block";
 document.getElementById("save-button"+no).style.display="none";
}

function delete_row(no)
{
	var contactID = no;

	var tmp = {
		ID: contactID
	}

	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/DeleteContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
 	document.getElementById("row"+no+"").outerHTML="";
}