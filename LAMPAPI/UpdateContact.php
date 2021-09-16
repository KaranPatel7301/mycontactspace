<?php
	$inData = getRequestInfo();
	$ID = $inData["ID"];
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Login = $inData["PhoneNumber"];
	$Password = $inData["EmailAddress"];
	

	$conn = new mysqli("localhost", "Admin", "Administrator", "project");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?,LastName=?,PhoneNumber=? EmailAddress=? WHERE ID=?");
		$stmt->bind_param("sssss", $inData["FirstName"], $inData["LastName"], $inData["PhoneNumber"], $inData["EmailAddress"], $inData["ID"]);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	