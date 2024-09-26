import { Box, List, ListItem } from "@mui/material"
import Style from './navStyle';
import Menu from '@mui/icons-material/MenuRounded';
import LOGO from '../../assets/logo.png';

const style = Style();
const Navbar = () => {
    const handleReload = () => {
        window.location.replace('/');
    }
    return(
        <Box sx={style.nav}>
            <Box sx={style.logo} onClick={handleReload}>
                <img
                    style={style.logoImg}
                    src={LOGO}
                    alt='BCA'
                />
            </Box>
            <List sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '1rem',
                paddingRight: {
                    xs: '2rem',
                    md: '0'
                },
            }}>
                <Box  sx={style.navlist}>
                    <ListItem>Home</ListItem>
                    <ListItem>About</ListItem>
                    <ListItem>Gallery</ListItem>
                    <ListItem>College</ListItem>
                </Box>

                <Box sx={{paddingTop: '4px'}}>
                    <Menu></Menu>
                </Box>
            </List>
        </Box>
    )
}
export default Navbar;