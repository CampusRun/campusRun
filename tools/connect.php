<?php
/**
 * Stellt die Verbindung zur Datenbank her
 *
 * @var string MySQL-Hostname
 * @var string Benutzername
 * @var string Benutzerkennwort
 * @var string Name der Datenbank
 * @return resource MySQL Verbindungs-Kennung
 */
function connect()
{
    //MySql Daten
    
    $MYSQL_host = 'localhost';
    $MYSQL_user = '';
    $MYSQL_passw = '';
    $db = 'db_campusrun';    
    
    
	$linkid = mysql_pconnect($MYSQL_host, $MYSQL_user, $MYSQL_passw) or die(mysql_error());
	mysql_select_db($db) or die(mysql_error());

	sql("SET NAMES 'utf8'");
	sql("SET CHARACTER SET 'utf8'");

	return $linkid;
}
?>