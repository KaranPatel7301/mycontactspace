<?php

	$inData = getRequestInfo();
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "Admin", "Administrator", "project");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("select ID, FirstName, LastName, PhoneNumber, EmailAddress, Notes, userId from Contacts where (FirstName like ? or LastName like ?) and userId=?");
		$Search = "%" . $inData["Search"] . "%";
		$userId = $inData["userId"];
		$stmt->bind_param("sss", $Search, $Search, $userId);
		$stmt->execute();
		
		$result = $stmt->get_result();
	
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"ID":"'.$row["ID"].'","FirstName":"'.$row["FirstName"].'", "LastName":"'.$row["LastName"].'", "PhoneNumber":"'.$row["PhoneNumber"].'", "Email":"'.$row["EmailAddress"].'", "Notes":"'.$row["Notes"].'"}';
    }

    if ($searchCount == 0) {
      returnWithError("No Records Found");
    } else {
      returnWithInfo($searchResults);
    }

    $stmt->close();
    $conn->close();
  }

  function getRequestInfo() {
    return json_decode(file_get_contents('php://input'), true);
  }

  function sendResultInfoAsJson($obj) {
    header('Content-type: application/json');
    echo $obj;
  }
  
  function returnWithError($err) {
    $retValue = '{"results":[], "error":"'.$err.'"}';
    sendResultInfoAsJson($retValue);
  }

  function returnWithInfo($searchResults) {
    $retValue = '{"results":['.$searchResults.'], "error":""}';
    sendResultInfoAsJson( $retValue );
  }
?>