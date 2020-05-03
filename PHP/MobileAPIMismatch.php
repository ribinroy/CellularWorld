<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cellular World | MisMatch</title>
    <?php
        require 'loadLibraries.php';
    ?>
        <script src="../JS/Mismatch.js"></script>
        <script src="../JS/Lib/fonoapi.min.js"></script>
        <link rel="stylesheet" type="text/css" media="screen" href="../../CSS/Mismatch.css" />
</head>

<div class="loadingDiv"></div>
<div class="devicePageWrap container">
    <div class="functions">
        <div class="StopAction" onclick='MM.buttonActions("L")'>List All</div>
        <div class="StopAction" onclick='MM.buttonActions("SA")'>Start</div>
        <div class="StopAction" onclick='MM.buttonActions("S")'>Stop</div>
        <div class="StopAction" onclick='MM.buttonActions("P")'>Pause</div>
        <div class="StopAction" onclick='MM.buttonActions("R")'>Resume</div>
        <div class="StopAction" onclick='MM.buttonActions("NFO")'>Not Found Only</div>
        <div class="StopAction" onclick='MM.buttonActions("FO")'>Found Only</div>
        <div class="StopAction" onclick='MM.buttonActions("ALL")'>Show All</div>
        <div class="label total"></div>
        <div class="label found"></div>
        <div class="label notFound"></div>
    </div>
    <div class="mismatchesFound"></div>
</div>


<div class="foneApiNotFOundChangeDIV"></div>