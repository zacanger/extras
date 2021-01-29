import React            from 'react'
import ParticipantsList from './ParticipantsList.jsx!'

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <header>
          <h2>sortaslack</h2>
          <img src="img/downarrow.svg" className="arrow"></img>
        </header>
        <div className="sidebar-content">
          <h4 className="sidebar-nav-header">channels</h4>
          <ul className="sidebar-nav-list">
            <li className="active">
              <a href="test">#general</a>
            </li>
          </ul>
          <h4 className="sidebar-nav-header">participants</h4>
          <ParticipantsList />
        </div>
        <footer>
          <img src ="img/profile.jpg" className="avatar"></img>
          <div className="meta">
            <span className="author">{name}</span>
            <a href="">logout</a>
          </div>
          <img src="img/uparrow.svg" className="arrow"></img>
        </footer>
      </div>
    )
  }
}
