import { Box, Typography } from "@mui/material";
import Style from "./FacultyStyle";
import hod from "../../assets/hod.jpg";
import Hexagon from "../../theme/Hexagon/Hexagon";
import Grid from "@mui/material/Grid2";

import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const s = Style();


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
                    <Box sx={{
                    background: 'var(--accent)',
                    height: '1px',
                    maxWidth: '980px',
                    margin: 0, 
                    padding: 0,
                    }}></Box>
                </Box>
                <Box>
                    <Typography variant="h3" sx={{
                            fontFamily: 'var(--titleFont)',
                            color: 'var(--color1)',
                    }}>
                    our <Typography variant="body" sx={{
                        color: 'var(--accent)',
                    }}>Gallery</Typography>
                    </Typography>
                </Box>
            </Box>
            <Box sx={s.text}>
                <Typography sx={{maxWidth: '600px',}} variant="body2">
                    Our faculty is a dedicated team of experienced professionals and educators committed to nurturing the next generation of tech leaders. With diverse backgrounds in academia and industry, they bring a wealth of knowledge and expertise to the classroom. Passionate about teaching and mentorship, our faculty members are always available to guide students in their academic journeys and foster a supportive learning environment.
                </Typography>
            </Box>


            <Grid container spacing={{ xs: 5, md: 5 }} sx={{padding: "2rem 0",}} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }} >
                        <Item>
                            <Box sx={{width: '120px', margin: {md: 'auto'}, position: 'relative'}}>
                                <Box
                                    sx={{position: 'relative',zIndex: 100000}}
                                >
                                    <Hexagon 
                                        img={hod}
                                    />
                                </Box>
                                <Box sx={s.hexagon2}>
                                    <Hexagon 
                                        img={hod}
                                        details={true}
                                    />
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                ))}
            </Grid>
            
            {/* <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'auto auto auto',
                placeItems: 'center',
                border: '1px solid',
                gap: 2,
                position: 'relative',
            }}>
      
                <Box sx={{width: '120px'}}>
                    <Hexagon 
                        img={hod}
                    />
                </Box>
                <Box sx={{width: '120px'}}>
                    <Hexagon 
                        img={hod}
                    />
                </Box>
                <Box sx={{width: '120px'}}>
                    <Hexagon 
                        img={hod}
                    />
                </Box>

                <Box sx={{width: '120px'}}>
                    <Hexagon 
                        img={hod}
                    />
                </Box>
                <Box sx={{width: '120px'}}>
                    <Hexagon 
                        img={hod}
                    />
                </Box>
                <Box sx={{width: '120px'}}>
                    <Hexagon 
                        img={hod}
                    />
                </Box>

            </Box> */}

        </Box>
    );
}

export default Faculty;
