import React from 'react'

const List = ({ items, remove }) => {
  const styles = {
    uList: {
      paddingLeft: 0,
      listStyleType: 'none'
    },
    listGroup: {
      margin: '5px 0',
      borderRadius: 5
    },
    removeItem: {
      cursor: 'pointer',
      color: '#333'
    },
    todoItem: {
      paddingLeft: 20,
      fontSize: 17
    }
  }

  const listItems = items.map((item, idx) =>
    <li key={idx} style={styles.listGroup}>
      <span style={styles.removeItem} onClick={remove.bind(null, idx)}>x</span>
      <span style={styles.todoItem}>{item}</span>
    </li>
  )

  return (
    <ul style={styles.uList}>{listItems}</ul>
  )
}

export default List
