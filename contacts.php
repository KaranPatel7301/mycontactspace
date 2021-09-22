<?php
  list(,,$val) = explode(",",$_COOKIE['firstName']);
    $mysqli = new mysqli("localhost", "Admin", "Administrator", "project");

  if ($mysqli->connect_error) 
	{
		returnWithError( $mysqli->connect_error );
	} 
	else
	{
		$sql = "SELECT * FROM Contacts WHERE $val";
        $result = $mysqli->query($sql);
        $mysqli->close();
    //$sql = "SELECT * FROM Users WHERE $val";
    //  $resultUsers = $mysqli->query($sql);
    //  $mysqli->close();
	}
?>

<!DOCTYPE html>
<html lang="en" class="h-100">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="Mark Otto, Jacob Thornton, Bootstrap contributors, Jonathan Field, and Nick Zdravkovic">
        <meta name="generator" content="Hugo 0.87.0">
        <title>MyContactSpace</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
         integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <?php echo '<link href="css/styles.css" rel="stylesheet" type="text/css" />'; ?>
    </head>
    <body class="d-flex h-100 text-center text-white">
      <div class="modal fade bannerformmodal" tabindex="-1" role="dialog" id="addContact">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content rounded-5 shadow">
            <div class="modal-header p-5 pb-4 border-bottom-0">
              <h2 class="fw-bold mb-0">Add contact information</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-5 pt-0">
              <form class="">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control rounded-4" id="firstName" placeholder="First name" maxlength = "25" onkeypress="return !/[^a-zA-Z ]/g.test(event.key)">
                  <label for="firstName">First name</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control rounded-4" id="lastName" placeholder="Last Name" maxlength = "25" onkeypress="return !/[^a-zA-Z ]/g.test(event.key)">
                  <label for="lastName">Last Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control rounded-4" id="contactsPhoneNumber" placeholder="648-929-4029">
                  <label for="contactsPhoneNumber">Phone Number</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="email" class="form-control rounded-4" id="contactsEmail" placeholder="name@example.com">
                  <label for="contactsEmail">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control rounded-4" id="contactsNotes" placeholder="Notes" maxlength = "100">
                  <label for="contactsNotes">Notes</label>
                </div>
                <button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" id="addButton" type="button" data-bs-dismiss="modal" onclick="addContact()">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="background-top" class="p-3 mb-2 bg-dark bg-gradient text-white"></div>
      <div class="cover-container-contacts d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header class="mb-auto">
            <div>
              <h3 id="title" class="float-md-start mb-0">MyContactSpace</h3>
              <button class="btn btn-secondary fw-bold border-white bg-white float-md-end" onclick="doLogout()">Sign Out</button>
              <?php
              //          while($rows=$resultUsers->fetch_assoc())
              //          {
              ?>
              <h5 id="user-name-display" class="float-md-end">Jonathan Field<?php// echo $rows['FirstName'];?> <?php// echo $rows['lastName'];?></h5>
              <?php
              //          }
              ?>
            </div>
          </header>

          <main class="px-3">
            <div class="search-bar-container">
              <div class="search-box">
                <input type="text" placeholder="Search contacts..." id="searchText" class="shadow">
                <button type="search-button" id="search-button" value="search" class="shadow btn btn-light search" onclick="searchContacts()">Search</button>
              </div>
            </div>

            <div id="table-wrapper">
              <table id="contactsTable" class="shadow table table-hover table-bordered bg-light">
                <thead>
                  <tr id="table-header" style="position: sticky; top: 0;">
                    <th scope="col" id="row-ID" style="display:none;">ID #</th>
                    <th scope="col" id="row-name">Name</th>
                    <th scope="col" id="row-phoneNumber">Phone Number</th>
                    <th scope="col" id="row-email">Email</th>
                    <th scope="col" id="row-notes">Notes</th>
                    <th scope="col" id="row-notes"></th>
                  </tr>
                </thead>
                <tbody>
                <div id="tableBody"> 
                  <?php
                        while($rows=$result->fetch_assoc())
                        {
                  ?>
                   
                      <tr id="row<?php echo $rows['ID'];?>">
                          <td style="display:none;"><?php echo $rows['ID'];?></td>
                          <td id="fullName"><span class="nowrap" id="firstName-row<?php echo $rows['ID'];?>"><?php echo $rows['FirstName'];?></span>&nbsp;<span class="nowrap" id=lastName-row<?php echo $rows['ID'];?>><?php echo $rows['LastName'];?></span></td>
                          <td id="phoneNumber-row<?php echo $rows['ID'];?>"><?php echo $rows['PhoneNumber'];?></td>
                          <td class="emailRow" id="email-row<?php echo $rows['ID'];?>"><?php echo $rows['EmailAddress'];?></td>
                          <td class="notesRow" id="notes-row<?php echo $rows['ID'];?>"><?php echo $rows['Notes'];?></td>
                          <td id="button-cell">
                              <button type="button" id="edit-button<?php echo $rows['ID'];?>" value="Edit" class="btn btn-light edit" onclick="edit_row('<?php echo $rows['ID'];?>')">Edit</button>
                              <button type="button" id="save-button<?php echo $rows['ID'];?>" value="Save" class="btn btn-light save" onclick="save_row('<?php echo $rows['ID'];?>')" style="display:none;">Save</button>
                              <button type="button" value="Delete" class="btn btn-danger delete" onclick="delete_row('<?php echo $rows['ID'];?>')">Delete</button>
                          </td>
                      </tr>
                    
                  <?php
                        }
                  ?>
                  </div>
                </tbody>
              </table>
            </div>
            <button type="button" class="shadow btn btn-light float-start launch-modal" data-bs-toggle="modal" data-bs-target="#addContact">Add contact</button>
          </main>
          <footer class="mt-auto text-white-50"></footer>
      </div>

      <script type="text/javascript" src="js/code.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </body> 
</html>