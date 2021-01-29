#!/usr/bin/env node

'use strict'

// Generates changelog.
// Contents are a list of commits to master.
// Usage: ./changelog.js [optional branch -- defaults to last tag]
// Example: ./changelog.js v5.1.9 > ReleaseNotes.md
// Originally based on https://github.com/npm/npm/blob/master/scripts/changelog.js
// To use in a different repo: be sure you're using git tags, and change the
// repo/project specific vars.

const { execSync } = require('child_process')
const lastTag = execSync('git describe --abbrev=0 --tags').toString().trim()
const branch = process.argv[2] || lastTag
const gitLog = execSync(
  `git log --reverse --pretty='format:%h %H%d %s (%aN)%n%b%n---%n' ${branch}...`
).toString().split(/\n/)
const lines = []
const ourRepo = 'zacanger/zeelib' // fill in your repo here

const shortname = (url) => {
  let matched = url.match(/https:\/\/github.com\/([^/]+\/[^/]+)\/(?:pull|issues)\/(\d+)/)
  if (!matched) return false
  let repo = matched[1]
  let id = matched[2]
  if (repo !== ourRepo) {
    return `${repo}#${id}`
  } else {
    return `#${id}`
  }
}

const printCommit = (c) => {
  lines.push(`* [\`${c.shortid}\`](https://github.com/${ourRepo}/commit/${c.fullid})`)
  if (c.fixes) {
    let label = shortname(c.fixes)
    if (label) {
      lines.push(`  [${label}](${c.fixes})`)
    } else {
      lines.push(`  [#${c.fixes}](https://github.com/${ourRepo}/issues/${c.fixes})`)
    }
  } else if (c.prurl) {
    let label = shortname(c.prurl)
    if (label) {
      lines.push(`  [${label}](${c.prurl})`)
    } else {
      lines.push(`  [#](${c.prurl})`)
    }
  }
  let msg = c.message
    .replace(/^\s+/mg, '')
    .replace(/^[-a-z]+: /, '')
    .replace(/^/mg, '  ')
    .replace(/\n$/, '')
  // backtickify package@version
    .replace(/^(\s*[^@\s]+@\d+[.]\d+[.]\d+)(\s*\S)/g, '$1:$2')
    .replace(/\b([^@\s]+@\d+[.]\d+[.]\d+)\b/g, '`$1`')
  // linkify commitids
    .replace(/\b([a-f0-9]{7,8})\b/g, '[`$1`](https://github.com/' + ourRepo + '/commit/$1)')
    .replace(/\b#(\d+)\b/g, '[#$1](https://github.com/' + ourRepo + '/issues/$1)')
  lines.push(msg)
  if (c.credit) {
    c.credit.forEach(function (credit) {
      lines.push(`  ([@${credit}](https://github.com/${credit}))`)
    })
  } else {
    lines.push(`  ([@${c.author}](https://github.com/${c.author}))`)
  }
}

const generate = (log) => {
  let commit = {}
  log.forEach((line) => {
    let m = []
    /* eslint no-cond-assign: 0 */
    if (/^---$/.test(line)) {
      printCommit(commit)
    } else if (m = line.match(/^([a-f0-9]{7}) ([a-f0-9]+) (?:[(]([^)]+)[)] )?(.*?) [(](.*?)[)]/)) {
      commit = {
        shortid: m[1]
      , fullid: m[2]
      , branch: m[3]
      , message: m[4]
      , author: m[5]
      , prurl: null
      , fixes: null
      , credit: null
      }
    } else if (m = line.match(/^PR-URL: (.*)/)) {
      commit.prurl = m[1]
    } else if (m = line.match(/^Credit: @(.*)/)) {
      if (!commit.credit) commit.credit = []
      commit.credit.push(m[1])
    } else if (m = line.match(/^Fixes: #?(.*?)/)) {
      commit.fixes = m[1]
    } else if (m = line.match(/^Reviewed-By: @(.*)/)) {
      commit.reviewed = m[1]
    } else if (/\S/.test(line)) {
      commit.message += `\n${line}`
    }
  })

  return lines
}

generate(gitLog)
