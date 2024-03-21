import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './Main';
import ListItems from './ListItems';
import Auth from './auth/Auth'


export default function RoutesComponent() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' Component={Auth}/>
          <Route path='/' Component={Main}/>
          <Route path='/View/:id' Component={ListItems}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}