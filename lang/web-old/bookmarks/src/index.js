import React, { Component } from 'react'
import { findDOMNode, render } from 'react-dom'
import slug from 'slug'

const baseUrl = '/api/bookmarks'
const data = {
  getBookmarks: () =>
    window.fetch(baseUrl)
      .then((a) => a.json()),

  createBookmark: (bookmark) =>
    window.fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'Content-Type': 'application/json'
      }
    }),

  deleteBookmark: (bookmark) =>
  window.fetch(baseUrl + slug(bookmark.link), {
    method: 'DELETE'
  })
}

class Bookmark extends Component {
  onDeleteClicked = () => {
    this.props.removeLine(this.props)
  }

  render () {
    return (
      <div>
        <h3><a href={this.props.link}>{this.props.title}</a></h3>
        <p>{(this.props.tags || []).map((t) => <span key={t}>{t}</span>)}</p>
        <button onClick={this.onDeleteClicked}>X</button>
      </div>
    )
  }
}

class BookmarkList extends Component {
  state = {
    bookmarks: this.props.bookmarks
  }

  setRef = (name) => (ref) => { this[name] = ref }

  onAddClicked = () => {
    const title = findDOMNode(this.titleInput).value
    const link = findDOMNode(this.linkInput).value
    const tags = [ ...new Set(findDOMNode(this.tagsInput).value.split(' ').filter((a) => a)) ]
    const bookmark = { title, link, tags }

    this.setState(({ bookmarks }) => ({ bookmarks: bookmarks.concat(bookmark) }))
    data.createBookmark(bookmark)
  }

  removeLine = (line) => {
    const { bookmarks } = this.state
    const idxToRemove = bookmarks.find((b) => b.link === line.link)
    const removed = bookmarks[idxToRemove]
    const newBms = [ ...bookmarks ].splice(idxToRemove, 1)
    this.setState({ bookmarks: newBms })
    data.deleteBookmark(removed)
  }

  render () {
    return (
      <div>
        <div>
          <label>title</label>
          <input ref={this.setRef('titleInput')} type="text" />
        </div>
        <div>
          <label>url</label>
          <input ref={this.setRef('linkInput')} type="text" />
        </div>
        <div>
          <label>tags</label>
          <input ref={this.setRef('tagsInput')} type="text" />
        </div>
        <div>
          <button onClick={this.onAddClicked}>+</button>
        </div>
        <div>
          {this.state.bookmarks.map((b, i) =>
            <Bookmark key={i} title={b.title} link={b.link} tags={b.tags} removeLine={this.removeLine} />
          )}
        </div>
      </div>
    )
  }
}

const App = ({ bookmarks }) => (
  <div>
    <h1>Bookmarks</h1>
    <BookmarkList bookmarks={bookmarks} />
  </div>
)

data.getBookmarks().then(({ rows }) => {
  render(
    <App bookmarks={rows} />,
    document.getElementById('root')
  )
})
