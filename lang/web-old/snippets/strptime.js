// lars lindner, GPLv2 or MIT (what? both? either?)

var dayName   = new Array('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')
  , monthName = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez')

// strptime() format string sim
function strptime (format, date) {
  var last   = -2
    , result = ''
    , hour   = date.getHours()

  // alias expansion
  format = format.replace(/%D/, '%m/%d/%y')
  format = format.replace(/%R/, '%H:%M')
  format = format.replace(/%T/, '%H:%M:%S')

  // fails on strings without format chars
  while(1) {
    // find next fmt char
    var pos = format.indexOf('%', last + 2)

    if (-1 == pos) {
      // dump remaining text if no moar fmt chars
      result += format.substr(last + 2)
      break
    } else {
      // dump txt after last fmt
      result += format.substr(last + 2, pos - (last + 2))

      // apply
      formatChar = format.charAt(pos + 1)
      switch (formatChar) {
        case '%':
          result += '%'
          break
        case 'C':
          result += date.getYear()
          break
        case 'H':
        case 'k':
          if (hour < 10) result += '0'
          result += hour
          break
        case 'M':
          if (date.getMinutes() < 10) result += '0'
          result += date.getMinutes()
          break
        case 'S':
          if (date.getSeconds() < 10) result += '0'
          result += date.getSeconds()
          break
        case 'm':
          if (date.getMonth() < 10) result += '0'
          result += date.getMonth()
          break
        case 'a':
        case 'A':
          result += dayName[date.getDay() - 1]
          break
        case 'b':
        case 'B':
        case 'h':
          result += monthName[date.getMonth()]
          break
        case 'Y':
          result += date.getFullYear()
          break
        case 'd':
        case 'e':
          if (date.getDate() < 10) result += '0'
          result += date.getDate()
          break
        case 'w':
          result += date.getDay()
          break
        case 'p':
        case 'P':
          if (hour < 12) {
            result += 'am'
          } else {
            result += 'pm'
          }
          break
        case 'l':
        case 'I':
          if (hour % 12 < 10) result += '0'
          result += (hour % 12)
          break
      }
    }
    last = pos
  }
  return result
}

