<?php

    $mysqli = new mysqli("localhost", "Admin", "Administrator", "project");

    if ($mysqli->connect_error) 
	{
		returnWithError( $mysqli->connect_error );
	} 
	else
	{
		$sql = "SELECT * FROM Contacts";
        $result = $mysqli->query($sql);
        $mysqli->close();
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
              <!-- <h5 class="modal-title">Modal title</h5> -->
              <h2 class="fw-bold mb-0">Add contact information</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-5 pt-0">
              <form class="">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control rounded-4" id="firstName" placeholder="First name" onkeypress="return /[a-z]/i.test(event.key)">
                  <label for="firstName">First name</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control rounded-4" id="lastName" placeholder="Last Name" onkeypress="return /[a-z]/i.test(event.key)">
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
              <button class="btn btn-secondary fw-bold border-white bg-white float-md-end" onclick="doLogout()">Sign Out</a>
              <!--
              <nav class="nav nav-masthead justify-content-center float-md-end">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                <a class="nav-link" href="#">Features</a>
                <a class="nav-link" href="#">Contact</a>
              </nav>
              -->
            </div>
          </header>

          <main class="px-3">
            <div id="table-wrapper">
              <table id="contactsTable" class="table table-hover table-bordered bg-light">
                <thead>
                  <tr>
                    <th scope="col">ID #</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                    <!--
                  <tr id="row1" style="display: none;">
                    <th scope="row">1</th>
                    <td id="name-row1"></td>
                    <td id="phoneNumber-row1"></td>
                    <td id="email-row1"></td>
                    <td id="notes-row1"></td>
                    <td id="button-cell">
                      <button type="button" id="edit-button1" value="Edit" class="btn btn-light edit" onclick="edit_row('1')">Edit</button>
                      <button type="button" id="save-button1" value="Save" class="btn btn-light save" onclick="save_row('1')" style="display:none;">Save</button>
                      <button type="button" value="Delete" class="btn btn-danger delete" onclick="delete_row('1')">Delete</button>
                    </td>
                  </tr>
                    -->
                  <?php
                        while($rows=$result->fetch_assoc())
                        {
                    ?>
                    <tr id="row<?php echo $rows['ID'];?>">
                        <td><?php echo $rows['ID'];?></td>
                        <td id="fullName"><span id="firstName-row<?php echo $rows['ID'];?>"><?php echo $rows['FirstName'];?></span>&nbsp;<span id=lastName-row<?php echo $rows['ID'];?>><?php echo $rows['LastName'];?></span></td>
                        <td id="phoneNumber-row<?php echo $rows['ID'];?>"><?php echo $rows['PhoneNumber'];?></td>
                        <td id="email-row<?php echo $rows['ID'];?>"><?php echo $rows['EmailAddress'];?></td>
                        <td id="notes-row<?php echo $rows['ID'];?>"><?php echo $rows['Notes'];?></td>
                        <td id="button-cell">
                            <button type="button" id="edit-button<?php echo $rows['ID'];?>" value="Edit" class="btn btn-light edit" onclick="edit_row('<?php echo $rows['ID'];?>')">Edit</button>
                            <button type="button" id="save-button<?php echo $rows['ID'];?>" value="Save" class="btn btn-light save" onclick="save_row('<?php echo $rows['ID'];?>')" style="display:none;">Save</button>
                            <button type="button" value="Delete" class="btn btn-danger delete" onclick="delete_row('<?php echo $rows['ID'];?>')">Delete</button>
                        </td>
                    </tr>
                    <?php
                        }
                    ?>
                  <!--
                  <tr id="row1">
                    <th scope="row">1</th>
                    <td id="name-row1">Mark Otto</td>
                    <td id="phoneNumber-row1">954-102-2039</td>
                    <td id="email-row1">ottomark@mdo.com</td>
                    <td id="notes-row1">Brother's friend that is very helpful with all things Apple.</td>
                    <td id="button-cell">
                      <button type="button" id="edit-button1" value="Edit" class="btn btn-light edit" onclick="edit_row('1')">Edit</button>
                      <button type="button" id="save-button1" value="Save" class="btn btn-light save" onclick="save_row('1')" style="display:none;">Save</button>
                      <button type="button" value="Delete" class="btn btn-danger delete" onclick="delete_row('1')">Delete</button>
                    </td>
                  </tr>
                  <tr id="row2">
                    <th scope="row">2</th>
                    <td id="name-row2">Jacob Thornton</td>
                    <td id="phoneNumber-row2">653-204-5829</td>
                    <td id="email-row2">thornfart@fat.com</td>
                    <td id="notes-row2">Cousin is a very long name and is pretty good to know.</td>
                    <td id="button-cell">
                      <button type="button" id="edit-button2" value="Edit" class="btn btn-light edit" onclick="edit_row('2')">Edit</button>
                      <button type="button" id="save-button2" value="Save" class="btn btn-light save" onclick="save_row('2')" style="display:none;">Save</button>
                      <button type="button" value="Delete" class="btn btn-danger delete" onclick="delete_row('2')">Delete</button>
                    </td>
                  </tr>
                  <tr id="row3">
                    <th scope="row">3</th>
                    <td id="name-row3">Henry Frank</td>
                    <td id="phoneNumber-row3">209-694-6843</td>
                    <td id="email-row3">hfrank@yahoo.com</td>
                    <td id="notes-row3">Uncle</td>
                    <td id="button-cell">
                      <button type="button" id="edit-button3" value="Edit" class="btn btn-light edit" onclick="edit_row('3')">Edit</button>
                      <button type="button" id="save-button3" value="Save" class="btn btn-light save" onclick="save_row('3')" style="display:none;">Save</button>
                      <button type="button" value="Delete" class="btn btn-danger delete" onclick="delete_row('3')">Delete</button>
                    </td>
                  </tr>
                  -->
                </tbody>
              </table>
            </div>
            <button type="button" class="btn btn-light float-start launch-modal" data-bs-toggle="modal" data-bs-target="#addContact">Add contact</button>
          </main>
          <footer class="mt-auto text-white-50"></footer>
      </div>

      <script type="text/javascript" src="js/code.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </body> 
</html>