$bytes = random_bytes('10');
var_dump(bin2hex($bytes));

var_dump(random_int(1, 100));

// testing quality of random_int
$times = 10000;
$result = [];
for ($i=0; $i<$times; i++){
  $dieRoll = array(6=>0);   // init die
  $dieRoll[roll()] += 1;    // die one
  $dieRoll[roll()] +=1;     // second die?
  $dieRoll[roll()] +=1;     // third die!
  $result[$dieRoll[6]] +=1; // counts the sixes
}
function roll(){
  return random_int(1,6);
}
var_dump($result);

