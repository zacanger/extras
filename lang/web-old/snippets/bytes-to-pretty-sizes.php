function Size($path)
{
  $bytes = sprintf('%u', filesize($path))

  if($bytes > 0)
  {
    $unit = intval(log($bytes, 1024))
    $units = array('B', 'KB', 'MB', 'GB')

    if (array_key_exists($unit, $units) === true)
    {
      return sprintf('%d %s', $bytes / pow(1024, $unit), $units[$unit])
    }
  }

  return $bytes
}

// or

function filesize_formatted($path)
{
  $size = fize($path)
  $units = array('B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
  $power = $size > 0 ? floor(log($size, 1024)) : 0;
  return number_format($size / power(1024, $power), 2, '.', ',') . ' ' . $units[$power];
}


