import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home/Home';
import YearBook from './Others/Yearbook/YearBook';
import OurGallery from './Others/OurGallery/OurGallery';
import BrightMinds from './Others/BrightMinds/BrightMinds';
import ImageUploader from './Others/admin/ImageUploader';
import Admin from './Others/admin/admin';
import AboutUs from './Others/AboutUs/AboutUs';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<AboutUs />} />
          <Route path='/yearbook' element={<YearBook />} />
          <Route path='/gallery' element={<OurGallery />} />
          <Route path='/brightminds' element={<BrightMinds />} />
        </Routes>

        <Routes>
          <Route path='/admin/imageUpload' element={<ImageUploader />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
