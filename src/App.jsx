import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home/Home';
import YearBook from './Others/Yearbook/YearBook';
import OurGallery from './Others/OurGallery/OurGallery';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/yearbook' element={<YearBook />} />
          <Route path='/gallery' element={<OurGallery />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
