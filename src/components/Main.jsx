import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

const listNamesData = [
  {
    id: 1,
    listName: 'Grocery'
  },
  {
    id:2,
    listName: 'Non-Grocery'
  }
]

export default function Main() {
  const [listNames, setListNames] = useState([])

  useEffect(() => {
    setListNames(listNamesData)
  }, [])

  return (
    <>
      <h1>Hello Lists</h1>
        <ul>
          {listNames.map((ln) => {
            return (
              <li key={ln.id}>
                <Link to={'/View/' + ln.id}>
                  {ln.listName}
                </Link>
              </li>
            )
          })}
        </ul>
    </>
  )
}