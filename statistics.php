<?php
/**
 * Basisverzeichnis ohne abschliessendem Slash
 */
$DOCUMENT_ROOT = dirname(__FILE__);

/**
 * Datenbankverbindung herstellen
 */
$tools_dir = $DOCUMENT_ROOT . "/tools/";
include_once($tools_dir . "connect.php");
include_once($tools_dir . "sql.php");

$dblk = connect();

/*
 * GET
 */
$test1 = $_GET['playername'];
$test2 = $_GET['time'];
$test3 = $_GET['lifes'];
$test4 = $_GET['level'];


if(!empty($test1)){
    sql("INSERT INTO `test` (playername,time,lifes,level) VALUES ('".$test1."','".$test2."','".$test3."','".$test4."')");
}


/*
 * XML BLA BLA
 */

//Ist die Datei da?
if(file_exists('xml/player.xml'))
{
    
    $xml = simplexml_load_file('xml/player.xml');
    
    $xmlDatei = $xml->addChild("Player");
    $xmlDatei->addChild("Playername", $test1);
    $xmlDatei->addChild("Time", $test2);
    $xmlDatei->addChild("Lifes", $test3);
    $xmlDatei->addChild("Level", $test4);

    $handle = fopen('xml/player.xml', 'wb'); 
    fwrite($handle, $xml->asXML());
    fclose($handle);
    
} 
else 
{
    die("Datei nicht gefunden!");
}
?>