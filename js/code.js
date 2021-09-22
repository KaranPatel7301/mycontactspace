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

        var tmp = {
                FirstName: firstName,
                LastName: lastName,
                Login: login,
                Password: password
        };

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
			return tokens[1];
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
				//document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
	setTimeout(location.reload.bind(location), 300);
}

function searchContacts()
{

	var c = document.getElementsByTagName("tbody");
	var i;
	for (i = 0; i < c.length; i++) 
	{
		c[i].style.display="none";
		//c[i].style.backgroundColor = "blue";
	}
	//c[0].style.backgroundColor = "blue";

	//document.getElementById("tableBody").remove();
	var srch = document.getElementById("searchText").value;

	//list(,,$val) = explode(",",$_COOKIE['firstName']);
	//$res = preg_replace("/[^0-9]/", "", $val);
	//document.getElementById("colorSearchResult").innerHTML = "";
	
	var tableBody = "";
	var table = document.getElementById("contactsTable");
	var userId = readCookie();
	var tmp = {
		Search: srch,
		userId: userId
	};

	//alert(userId);
	var jsonPayload = JSON.stringify( tmp );
	//alert(jsonPayload);
	var url = urlBase + '/SearchContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//alert(xhr.responseText)
				var jsonObject = JSON.parse( xhr.responseText );

				//alert(jsonObject.results.length);
				for(var i = 0; i < jsonObject.results.length; i++)
				{
					tableBody += jsonObject.results[i];
					//alert(jsonObject.results[i].userId);
					//alert("FOR LOOP IS WORKING");
					//if(i < jsonObject.results.length - 1)
					//{
							// Make a new row in the table
						let template = `
						<tbody>
						<tr id="row${jsonObject.results[i].ID}">
							<td style="display:none;">${jsonObject.results[i].ID}></td>
							<td id="fullName"><span class="nowrap" id="firstName-row${jsonObject.results[i].ID}">${jsonObject.results[i].FirstName}</span>&nbsp;<span class="nowrap" id="lastName-row${jsonObject.results[i].ID}">${jsonObject.results[i].LastName}</span></td>
							<td id="phoneNumber-row${jsonObject.results[i].ID}">${jsonObject.results[i].PhoneNumber}</td>
							<td class="emailRow" id="email-row${jsonObject.results[i].ID}">${jsonObject.results[i].Email}</td>
							<td class="notesRow" id="notes-row${jsonObject.results[i].ID}">${jsonObject.results[i].Notes}</td>
							<td id="button-cell">
								<button type="button" id="edit-button${jsonObject.results[i].ID}" value="Edit" class="btn btn-light edit" onclick="edit_row('${jsonObject.results[i].ID}')">Edit</button>
								<button type="button" id="save-button${jsonObject.results[i].ID}" value="Save" class="btn btn-light save" onclick="save_row('${jsonObject.results[i].ID}')" style="display:none;">Save</button>
								<button type="button" value="Delete" class="btn btn-danger delete" onclick="delete_row('${jsonObject.results[i].ID}')">Delete</button>
							</td>
						</tr>
						</tbody>`;

						table.innerHTML += template;
					//}
				}
				
				//document.getElementsByTagName("p")[0].innerHTML = tableBody;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
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
 
 firstName.innerHTML="<input type='text' class='nameInput inputLeft' id='firstName-text"+no+"' value='"+firstName_data+"' maxlength = '25'>";
 lastName.innerHTML="<input type='text' class='nameInput inputRight' id='lastName-text"+no+"' value='"+lastName_data+"' maxlength = '25'>";
 phoneNumber.innerHTML="<input type='text' class='phoneNumberInput' id='phoneNumber-text"+no+"' value='"+phoneNumber_data+"'>";
 email.innerHTML="<input type='text' class='emailInput' id='email-text"+no+"' value='"+email_data+"'>";
 notes.innerHTML="<input type='text' id='notes-text"+no+"' value='"+notes_data+"' maxlength = '100'>";
}

function save_row(no)
{
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
				//document.getElementById("contactSaveResult").innerHTML = "Color has been saved";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("contactSaveResult").innerHTML = err.message;
	}

 document.getElementById("firstName-row"+no).innerHTML=newFirstName;
 document.getElementById("lastName-row"+no).innerHTML=newLastName;
 document.getElementById("phoneNumber-row"+no).innerHTML=newPhoneNumber;
 document.getElementById("email-row"+no).innerHTML=newEmail;
 document.getElementById("notes-row"+no).innerHTML=newNotes;

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
				//document.getElementById("contactDeleteResult").innerHTML = "Color has been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("contactDeleteResult").innerHTML = err.message;
	}
	
 	document.getElementById("row"+no+"").outerHTML="";
}