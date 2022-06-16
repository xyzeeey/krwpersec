import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setSpend } from "./store.js";
import './App.css';
import Home from './pages/Home';
import Main from './pages/Main';
import Edit from './pages/Edit';

function App() {
  let dispatch = useDispatch();
  const localDataSpend = localStorage.getItem('totalSpend');
  if(localDataSpend) {
    dispatch(setSpend(parseInt(localDataSpend)));
  }
  let totalSpend = useSelector(state => state.totalSpend);
  
  return (
    <div className='App'>
      
        <BrowserRouter>
          <Routes>
            <Route path={`${process.env.PUBLIC_URL}/`} element={!totalSpend ? <Home /> : <Main />} />
            <Route path='/main' element={<Main />} />
            <Route path='/edit' element={<Edit />} />
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
