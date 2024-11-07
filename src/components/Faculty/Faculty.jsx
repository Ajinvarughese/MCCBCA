import { Box, Typography } from "@mui/material";
import Style from "./FacultyStyle";
import hod from "../../assets/hod.jpg";
import Hexagon from "../../theme/Hexagon/Hexagon";
import Grid from "@mui/material/Grid2";

import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Titles from "../../theme/Style/Titles";
import { Fade } from "easy-reveal";

const titles = Titles();

const s = Style();
const detail = [
    {
        name: "Ms. Saramma John",
        designation: "H.O.D BCA",
        qualification: "M.sc, Bsc"
    },
    {
        name: "Ms. Anu Thomas",
        designation: "Faculty",
        qualification: "M.sc, MCA"
    },
    {
        name: "Ms. Saramma John",
        designation: "H.O.D BCA",
        qualification: "M.sc, Bsc"
    },
    {
        name: "Ms. Anu Thomas",
        designation: "Faculty",
        qualification: "M.sc, MCA"
    },
    {
        name: "Ms. Saramma John",
        designation: "H.O.D BCA",
        qualification: "M.sc, Bsc"
    },
    {
        name: "Ms. Anu Thomas",
        designation: "Faculty",
        qualification: "M.sc, MCA"
    }
]

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent ',
  padding: theme.spacing(2),
  ...theme.applyStyles('dark', {
    backgroundColor: 'transparent ',
  }),
}));

const Faculty = () => {
    return(
   
        <Box sx={s.main}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                margin: 0, 

            }}>
                <Box sx={{
                    flex: 1,
                    margin: 0, 
                    padding: 0, 
                }}>
                    <Fade left duration={1500}>
                    <Box sx={{
                    background: 'var(--accent)',
                    height: '1px',
                    maxWidth: '980px',
                    margin: 0, 
                    padding: 0,
                    }}></Box>
                    </Fade>
                </Box>
                <Box>
                    <Fade right duration={1500}>
                    <Typography variant="h3" sx={titles.title}>
                    our <Typography variant="body" sx={{
                        color: 'var(--accent)',
                    }}>faculty</Typography>
                    </Typography>
                    </Fade>
                </Box>
            </Box>
            <Box sx={s.text}>
                <Fade up duration={1500}>
                <Typography sx={{maxWidth: '600px',}} variant="body2">
                    Our faculty is a dedicated team of experienced professionals and educators committed to nurturing the next generation of tech leaders. With diverse backgrounds in academia and industry, they bring a wealth of knowledge and expertise to the classroom. Passionate about teaching and mentorship, our faculty members are always available to guide students in their academic journeys and foster a supportive learning environment.
                </Typography>
                </Fade>
            </Box>


            <Grid container spacing={{ xs: 5, md: 5 }} sx={{padding: "2rem 0",}} columns={{ xs: 3, sm: 8, md: 12 }}>
                {Array.from(detail).map((_, index) => (
                    <Grid sx={{ margin: 'auto',}} key={index} size={{ xs: 2, sm: 4, md: 4 }} >
                        <Item>
                            <Fade up duration={1500} delay={index*300}>
                                <Box sx={{width: {xs: '160px', sm: '140px'}, margin: {xs: 0, md: 'auto'}, position: 'relative'}}>
                                    <Box
                                        sx={{position: 'relative',zIndex: 1}}
                                    >
                                        <Hexagon 
                                            img={hod}
                                        />
                                    </Box>
                                    <Box sx={s.hexagon2}>
                                        <Hexagon 
                                            img={hod}
                                            details={true}
                                            content={detail[index]}
                                        />

                                    </Box>
                                </Box>
                            </Fade>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Faculty;
