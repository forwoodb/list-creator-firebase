import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getDatabase, ref, onValue, push, remove, update} from 'firebase/database'

export default function ListItems() {
  const [listName, setListName] = useState('')
  const [listItems, setListItems] = useState([])
  const [editItemText, setEditItemText] = useState('')
  const [updateItemText, setUpdateItemText] = useState('')
  const {id} = useParams()

  const db = getDatabase()
  const getRef = (url) => {
    return ref(db, url)
  }

  const baseURL = 'lists/' + id + '/listItems'

  useEffect(() => {
    const url = baseURL
    onValue(getRef(url), (snapshot) => {
      const collection = []

      const data = snapshot.val()
      
      for (const item in data) {
        console.log(item);
        collection.push({
          id: item,
          itemText: data[item].itemText
        })
      }

      console.log(collection);

      setListName(data.listName)
      setListItems(collection)
    })
  }, [])

  const handleNewItem = (e) => {
    e.preventDefault() 

    const newItem = {
      itemText: e.target.newItemText.value
    }
    const url = baseURL
    push(getRef(url), newItem)

    e.target.newItemText.value = ''
  }

  const deleteItem = (itemId) => {
    const url = baseURL + '/' + itemId
    remove(getRef(url), itemId)
  }

  const editItem = (item) => {
    setEditItemText(item.id)
    setUpdateItemText(item.itemText)
  }

  const handleUpdate = (itemId) => {
    const updatedItem = {
      id: itemId,
      itemText: updateItemText
    }
    const url = baseURL + '/' + itemId
    update(getRef(url), updatedItem)

    window.location.reload()
  }

  return (
    <>
      <h1>{listName}</h1>
      <form onSubmit={handleNewItem}> 
        <input type="text" name="newItemText" />
        <button>Add</button>
      </form>
      <p>List Items</p>
      <ul>
        {listItems.map((lit) => {
          if (editItemText === lit.id) {
            return <li key={lit.id}>
              <input type="text" value={updateItemText} onChange={(e) => setUpdateItemText(e.target.value)}/>
              <button onClick={() => handleUpdate(lit.id)}>Update</button>
            </li>
          } else {
            return <li key={lit.id}>
              {lit.itemText}
              <button onClick={() => deleteItem(lit.id)}>Delete</button>
              <button onClick={() => editItem(lit)}>Edit</button>
            </li>
          }
          
        })}
      </ul>
    </>
  );
}
