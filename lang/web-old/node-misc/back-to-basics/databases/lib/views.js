'use strict'

module.exports = {
  by_author : {
    map(doc){
      if('authors' in doc){
        doc.authors.forEach(emit)
      }
    }.toString()
  , reduce : '_count'
  }
, by_subject : {
    map(doc){
      if('subjects' in doc){
        doc.subjects.forEach((subject) => {
          emit(subject, subject)
          subject.split(/\s+--\s+/).forEach((part) => {
            emit(part, subject)
          })
        })
      }
    }.toString()
  , reduce : '_count'
  }
}
