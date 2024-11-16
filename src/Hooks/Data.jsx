import AboutJson from "../json/About.json";
import BrightMinds from "../json/BrightMinds.json";
import Faculty from "../json/Faculty.json";
import GalleryMain from "../json/GalleryMain.json";
import Theme from "../json/Theme.json";


const Data = () => {
    return {
        about: AboutJson,
        brightMinds: BrightMinds,
        faculty: Faculty,
        gallery: GalleryMain,
        theme: Theme
    }
}

export default Data;