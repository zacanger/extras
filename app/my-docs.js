var config      = require('../server/config')
  , glob        = require('glob')
  , path        = require('path')
  , fs          = require('fs')
  , stringUtils = require('underscore.string')
  , md          = require('markdown-it')(config.markdown)
  , lunr        = require('lunr')

// markdown plugins
md.use(require('markdown-it-checkbox'))
md.use(require('markdown-it-toc'))

function getPageNotFound() {
  return {
    template   : 'error'
  , page_title : 'Documentation 404 Not Found'
  }
}

function getPage(id) {
  if (id === '/') {
    return getHomePage()
  }
  var filePath = getPagePath(id)

  if (!fs.existsSync(filePath)) {
    return getPageNotFound()
  }

  return {
    template    : 'page'
  , page_title  : 'My First Page'
  , pageId      : id
  , content     : getPageContent(filePath)
  , hasNavItems : true
  , navItems    : getSidebarNavigation(config.contentFolder, id)
  }
}

function getPagePath(id) {
  return path.join(config.contentFolder, id + '.md')
}

function getPageContent(filePath) {
  var content = fs.readFileSync(filePath, 'utf-8')
  return md.render(content)
}

function searchPages(query) {
  var content = path.join(config.contentFolder, '**/*.md')
    , ignored = path.join(config.contentFolder, 'UPLOADS/**/*.*')
    , files   = glob.sync(content, {
    ignore : ignored
  })

  var idx = lunr(function() {
    this.field('title', {
      boost: 10
    })
    this.field('body')
    this.pipeline.remove(lunr.stopWordFilter)
  })

  var cache = {}


  files.forEach(function(file) {
    var id      = getNavItemLink(file)
      , title   = getNavItemName(file)
      , content = fs.readFileSync(file, 'utf-8')

    idx.add({
      'id'    : id
    , 'title' : title
    , 'body'  : content
    })

    cache[id] = {
      href        : id
    , name        : title
    , description : stringUtils.prune(content, config.excerpt_length)
    , date        : fs.statSync(file).mtime
    }
  })

  var results = idx.search(query).map(function(item) {
    return cache[item.ref]
  })

  return {
    template    : 'search'
  , hasResults  : results.length > 0
  , results     : results
  , query       : query
  , hasNavItems : true
  , navItems    : getSidebarNavigation(config.contentFolder)
  }
}

function getHomePage() {
  return {
    template    : 'page'
  , page_title  : 'Documentation Home'
  , content     : getPageContent(config.readme)
  , hasNavItems : true
  , navItems    : getSidebarNavigation(config.contentFolder)
  }
}

var getSidebarNavigation = function(dir, activePage) {
  var results = []
    , list = fs.readdirSync(dir)
    , navItems
  list.filter(isNotHiddenItem).forEach(function(file) {
    file = path.join(dir, file)
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      navItems = getSidebarNavigation(file, activePage);
      results.push({
        name        : getNavItemName(file)
      , href        : '#'
      , hasNavItems : navItems.length > 0
      , navItems    : navItems
      })
    } else {
      if (path.extname(file) != '.md') {
        return // allow only markdown files
      }
      var href = '/' + getNavItemLink(file);
      results.push({
        name        : getNavItemName(file)
      , href        : href
      , cssClass    : href == activePage ? 'active' : ''
      , hasNavItems : false
      })
    }
  })
  return results
}


function isNotHiddenItem(el) {
  if (path.basename(el)[0] == '.') {
    return false // hidden files/dirs
  }
  if (path.basename(el) == 'UPLOADS') {
    return false
  } // uploads dir
  return true
}

function getNavItemName(file) {
  var fileName = path.basename(file, path.extname(file))
  return stringUtils.humanize(fileName)
}


function getNavItemLink(file) {
  var fileName = path.basename(file, path.extname(file))
    , filePath = path.join(path.dirname(file), fileName)
  return path.relative(config.contentFolder, filePath).replace(/\\/g, '/')
}

module.exports = {
  getHomePage : getHomePage
, getPage     : getPage
, searchPages : searchPages
}

