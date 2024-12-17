import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home/Home';
import YearBook from './Others/YearBook/YearBook';
import OurGallery from './Others/OurGallery/OurGallery';
import BrightMinds from './Others/BrightMinds/BrightMinds';
import ImageUploader from './Others/admin/ImageUploader';
import Admin from './Others/admin/admin';
import AboutUs from './Others/AboutUs/AboutUs';
import YearBookStatus from './Others/admin/YearBookStatus';

import APIURL from "./Hooks/URL";
import UploadNotes from './Others/admin/UploadNotes';
import Notes from './Others/Notes/Notes';
const api = APIURL();
function App() {
  fetch(api.api + "yearbook/showAll")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(() => {
    console.log("Hey Welcome");
  })
  .catch(() => {
    console.error("Error fetching data:", error);
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<AboutUs />} />
          <Route path='/yearbook' element={<YearBook />} />
          <Route path='/gallery' element={<OurGallery />} />
          <Route path='/brightminds' element={<BrightMinds />} />
          <Route path='/notes' element={<Notes />} />
        </Routes>

        <Routes>
          <Route path='/admin/yearBookStatus' element={<YearBookStatus />} />
          <Route path='/admin/ImageUpload' element={<ImageUploader />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/UploadNotes' element={<UploadNotes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
