// include jquery, obvs

function toggleVis(id){
  if($(id).is(':visible')){
    $(id).hide()
  } else {
    $(id)
      .show()
      .children()
        .show()
  }
}

