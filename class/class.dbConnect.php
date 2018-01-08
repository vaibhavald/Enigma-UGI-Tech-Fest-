<?php
class dbConnect
{
		function connect()
		{
			$con = mysqli_connect("localhost","ugienigm_root","vaibhav@30");
			mysqli_select_db($con,"ugienigm_enigma");
			return $con;
		}
		
		function execute($query)
		{
			return mysqli_query($this->connect(),$query);
		}
}
?>