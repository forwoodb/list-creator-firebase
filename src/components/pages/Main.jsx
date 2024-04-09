/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import app from "../../firebase.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  update,
} from "firebase/database";

import SignOut from "../auth/SignOut";

export default function Main(props) {
  const [listNames, setListNames] = useState([]);
  const [editListName, setEditListName] = useState("");
  const [updateListName, setUpdateListName] = useState("");

  // Connect DB
  const db = getDatabase(app);

  // Get URL reference
  const getRef = (url) => {
    return ref(db, url);
  };

  useEffect(() => {
    const url = "lists";

    // Get Data
    onValue(getRef(url), (snapshot) => {
      let collection = [];

      let data = snapshot.val();

      for (let l in data) {
        if (data[l].user === props.user) {
          collection.push({
            id: l,
            listName: data[l].listName,
            user: props.user,
          });
        }
      }

      setListNames(collection);
    });
    // })
  }, []); // ??? --> React Hook useEffect has a missing dependency: 'listNamesRef'. Either include it or remove the dependency array.

  const handleNewSubmit = (e) => {
    e.preventDefault();

    const newList = {
      listName: e.target.newListName.value,
      user: props.user,
    };
    console.log(newList);
    const url = "lists";
    push(getRef(url), newList);

    e.target.newListName.value = "";
  };

  const deleteList = (id) => {
    const url = "lists/" + id;
    remove(getRef(url));
  };

  const editList = (item) => {
    setEditListName(item.id);
    setUpdateListName(item.listName);
  };

  const handleUpdate = (id) => {
    const updatedListName = {
      id,
      listName: updateListName,
      user: props.user,
    };

    const url = "lists/" + id;
    update(getRef(url), updatedListName);

    window.location.reload();
  };

  console.log(props.userEmail);

  return (
    <>
      <SignOut user={props.user} delete={deleteList} />
      <p>Hello {props.userEmail}</p>
      <h1>Create List</h1>
      <form onSubmit={handleNewSubmit}>
        <input type="text" name="newListName" />
        <button>Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {listNames.map((ln) => {
          if (editListName === ln.id) {
            return (
              <tr key={ln.id}>
                <td>
                  <input
                    type="text"
                    value={updateListName}
                    onChange={(e) => setUpdateListName(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdate(ln.id)}>Update</button>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={ln.id}>
                <td>{ln.listName}</td>
                <td>
                  <Link to={"/View/" + ln.id}>
                    <button>View List</button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => deleteList(ln.id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => editList(ln)}>Edit</button>
                </td>
              </tr>
            );
          }
        })}
      </table>
    </>
  );
}
