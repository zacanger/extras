angular.module('btford.markdown', ['ngSanitize'])

.provider('markdownConverter', () => {
  let opts = {}
  return {
    config(newOpts){
      opts = newOpts
    }
  , $get(){
      return new showdown.Converter(opts)
    }
  }
})

.directive('btfMarkdown', ['$sanitize', 'markdownConverter', ($sanitize, markdownConverter) => {
  return {
    restrict : 'AE'
  , link(scope, element, attrs){
      if (attrs.btfMarkdown) {
        scope.$watch(attrs.btfMarkdown, newVal => {
          const html = newVal ? $sanitize(markdownConverter.makeHtml(newVal)) : ''
          element.html(html)
        })
      } else {
        const html = $sanitize(markdownConverter.makeHtml(element.text()))
        element.html(html)
      }
    }
  }
}])

