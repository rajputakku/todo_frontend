import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'
import { Icon} from '@iconify/react';
import trashAlt from '@iconify/icons-fa-regular/trash-alt';
import './index.css';



class ListsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: props.lists
    }
  }

removeToCollection(key, e) {
    console.log(key);
  }
  render() {
    const lists = this.state.lists
    if (lists.length === 0) {
      return <div>Create Todo List</div>
    } else {
      return (
      <div>
      <h1 className="todo_head" style={{textAlign: 'center'}}>TodoList</h1>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lists.map(list => (
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>{list.title}</td>
                <td>{list.body}</td>
                <td>
                  <Link className="btn btn-success" to={`/lists/${list.id}/edit`}>
                </Link>{' '}
                <Link className="btn btn-danger" to={`/lists/${list.id}/delete`}>
<Icon icon={trashAlt} />
                </Link>
                {/* <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm("Delete the item?")) {
              let removeToCollection = this.removeToCollection.bind(this, list.id);
              removeToCollection();
            }
          }}
        >
          Delete
        </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      )
    }
  }
}

export default ListsTable