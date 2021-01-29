$(document).ready(function(){
  populateTable()
})

function populateTable(){
  var tableContent = ''
  $.getJSON( '/download', function(data){
    for(var item in data){
      tableContent += '<tr>'
      tableContent += '<td>' + data[item] + '</td>'
      tableContent += '<td><a href='+'/'+data[item]+'>' + data[item]+ '</a></td>'
    }
    $('#download table tbody').html(tableContent)
  })
}

