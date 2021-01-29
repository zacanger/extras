#!/usr/bin/env php

<?php
function m($i){$d='123456789';$s=substr($d,0,$i);if(strlen($s>1)){$o=substr($s,0,-1).strrev($s);}else {$o=$s;}$sum=1;return str_pad($o,$i+12," ",STR_PAD_LEFT).PHP_EOL;}for($i=1;$i<10;$i++){print m($i);}for($i=8;$i>0;$i--){print m($i);}
