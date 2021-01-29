print "wat ur naem?  "
name = gets
puts "oi " + name
puts "oi #{name}"

reverse_name = name.reverse.downcase
puts reverse_name

whatever = <<-STRING
this is a thingy\tasdfasdf
what
let's do it
STRING

puts whatever.reverse.upcase  