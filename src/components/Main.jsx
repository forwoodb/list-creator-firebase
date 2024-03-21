import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import app from '../firebase.js'
import {getDatabase, ref, onValue, push, remove, update} from "firebase/database";

export default function Main() {
  const [listNames, setListNames] = useState([])
  const [editListName, setEditListName] = useState('')
  const [updateListName, setUpdateListName] = useState('')

  // Connect DB
  const db = getDatabase(app)

  // Get URL reference
  const getRef = (url) => {
    return ref(db, url) 
  }
 
  useEffect(() => {
    const url = 'lists'

    // Get Data
    onValue(getRef(url), (snapshot) => {
      let collection = []

      let data = snapshot.val()

      for (let l in data) {
        collection.push({
          id: l,
          listName: data[l].listName
        })
      }
      
      setListNames(collection)
    })
  // })
  }, []) // ??? --> React Hook useEffect has a missing dependency: 'listNamesRef'. Either include it or remove the dependency array.

  const handleNewSubmit = (e) => {
    e.preventDefault()

    const newList = {
      listName: e.target.newListName.value,
    }
    console.log(newList);
    const url = 'lists'
    push(getRef(url), newList)
    
    e.target.newListName.value = ''
  }

  const deleteList = (id) => {
    const url = 'lists/' + id
    remove(getRef(url))
  }

  const editList = (item) => {
    setEditListName(item.id)
    setUpdateListName(item.listName)
  }

  const handleUpdate = (id) => {
    const updatedListName = {
      id,
      listName: updateListName
    }

    const url = 'lists/' + id
    update(getRef(url), updatedListName)
    
    window.location.reload()
  }


  return (
    <>
      <h1>Create List</h1>
      <form  onSubmit={handleNewSubmit}>
        <input type="text" name='newListName'/>
        <button>Add</button>
      </form>
      <ul>
        {listNames.map((ln) => {
          if (editListName === ln.id) {
            return (
              <li key={ln.id}>
                <input type="text" value={updateListName} onChange={(e) => setUpdateListName(e.target.value)} />
                <button onClick={() => handleUpdate(ln.id)}>Update</button>
              </li>
            )
          } else {
            return (
              <li key={ln.id}>
                <Link to={'/View/' + ln.id}>
                  {ln.listName}
                </Link>
                <button onClick={() => deleteList(ln.id)}>Delete</button>
                <button onClick={() => editList(ln)}>Edit</button>
              </li>
            )
          }
        })}
      </ul>
    </>
  )
}