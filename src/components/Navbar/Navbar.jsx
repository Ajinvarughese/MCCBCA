import { Box, List, ListItem } from "@mui/material"
import Style from './navStyle';

const style = Style();
const Navbar = () => {
    return(
        <Box sx={style.nav}>
            <Box>LOGO</Box>
            <List sx={style.navlist}>
                <ListItem>Home</ListItem>
                <ListItem>About</ListItem>
                <ListItem>Gallery</ListItem>
                <ListItem>College</ListItem>
                <ListItem>Contact</ListItem>
            </List>
        </Box>
    )
}
export default Navbar;