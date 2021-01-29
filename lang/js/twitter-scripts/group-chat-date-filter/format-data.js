const GC_ID = '' // fill this in

require('fs').writeFileSync('./messages.json',
  JSON.stringify(
    // fix the first line of this bit and put it in the right place
    require('./direct-message-group')
      .filter(a => a.dmConversation)
      .filter(a => a.dmConversation.conversationId === GC_ID)
      .map(a => a.dmConversation.messages)
      .flat()
      .map(a => a.messageCreate)
      .filter(a => a),
    null, 2))
