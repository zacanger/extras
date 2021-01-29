'use strict'

const
  config      = require('./config')
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
  , page_title : '404 : Content Not Found'
  }
}

function getPage(id) {
  let filePath = getPagePath(id)

  if (id === '/') {
    return getHomePage()
  }

  if (!fs.existsSync(filePath)) {
    return getPageNotFound()
  }

  return {
    template    : 'page'
  , page_title  : 'mdkb'
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
  let content = fs.readFileSync(filePath, 'utf-8')
  return md.render(content)
}

function searchPages(query) {
  let
    content = path.join(config.contentFolder, '**/*.md')
  , ignored = path.join(config.contentFolder, 'static/**/*.*')
  , files   = glob.sync(content, {ignore : ignored})

  let idx = lunr(function() {
    this.field('title', {boost : 10})
    this.field('body')
    this.pipeline.remove(lunr.stopWordFilter)
  })

  let cache = {}

  files.forEach(function(file) {
    let
      id      = getNavItemLink(file)
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

  let results = idx.search(query).map(item => cache[item.ref])

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
  , page_title  : 'Home'
  , content     : getPageContent(config.readme)
  , hasNavItems : true
  , navItems    : getSidebarNavigation(config.contentFolder)
  }
}

function getSidebarNavigation(dir, activePage){
  let
    results = []
  , list = fs.readdirSync(dir)
  , navItems

  list.filter(isNotHiddenItem).forEach(file => {
    file = path.join(dir, file)

    let stat = fs.statSync(file)

    if (stat && stat.isDirectory()) {
      navItems = getSidebarNavigation(file, activePage)

      results.push({
        name        : getNavItemName(file)
      , href        : '#'
      , hasNavItems : navItems.length > 0
      , navItems    : navItems
      })

    } else {
      if (path.extname(file) != '.md') {
        return // only allow markdown files
      }

      let href = '/' + getNavItemLink(file)
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

  if (path.basename(el) == 'static') {
    return false
  }

  return true
}

function getNavItemName(file) {
  let fileName = path.basename(file, path.extname(file))
  return stringUtils.humanize(fileName)
}


function getNavItemLink(file) {
  let
    fileName = path.basename(file, path.extname(file))
  , filePath = path.join(path.dirname(file), fileName)

  return path.relative(config.contentFolder, filePath).replace(/\\/g, '/')
}

module.exports = {
  getHomePage : getHomePage
, getPage     : getPage
, searchPages : searchPages
}

