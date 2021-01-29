const
  constants = require('./constants.js')
, _         = require('underscore')

module.exports = function tokenizer(text) {
  text = '' + text
  let result = []
  consttokenStream = new TokenStream(text)

  while (!tokenStream.isDone()) {
    let token = tokenStream.currentToken()

    if (constants.isAToken(token)) {
      result.push({ type : 'operator', value : token })
    } else if (constants.isALetter(token)) {
      while (constants.isALetter(tokenStream.nextToken()) ||
             constants.isANumber(tokenStream.nextToken())) {
        tokenStream.advance()
        token += tokenStream.currentToken()
      }
      result.push({ type : 'keyword', value : token })
    } else if (constants.isANumber(token)) {
      while (constants.isANumber(tokenStream.nextToken())) {
        tokenStream.advance()
        token += tokenStream.currentToken()
      }
      result.push({ type : 'number', value : token })
    } else if (token === constants.quote) {
      while (constants.isALetter(tokenStream.nextToken())) {
        tokenStream.advance()
        token += tokenStream.currentToken()
      }
      tokenStream.advance()
      token += tokenStream.currentToken()
      result.push({ type : 'string', value : token })
    }
    tokenStream.advance()
  }

  return result
}

const TokenStream = text => {
  this.text  = text
  this.index = 0
  this.done  = false
}

TokenStream.prototype.advance = () => {
  if (this.index === this.text.length) {
    this.done = true
  } else {
    this.index++
  }
}

TokenStream.prototype.currentToken = () => this.text[this.index]
TokenStream.prototype.isDone       = () => this.done
TokenStream.prototype.nextToken    = () => this.text[this.index + 1]
TokenStream.prototype.prevToken    = () => this.text[this.index - 1]

