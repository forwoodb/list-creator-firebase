import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './Main';
import ListItems from './ListItems';

export default function RoutesComponent() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Main}/>
          <Route path='/View/:id' Component={ListItems}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}