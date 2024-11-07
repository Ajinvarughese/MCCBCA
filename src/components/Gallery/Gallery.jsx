import { Box, Typography } from "@mui/material";
import Button from "../../theme/Button/Button";

import MainGallery from "../../theme/ImageList/MainGallery";
import Titles from "../../theme/Style/Titles";
import { Fade } from "easy-reveal";

const titles = Titles();
const Gallery = () => {
    return(
   
        <Box sx={{
            minHeight: '569px', 
            padding: {
                xs: '7rem 4% 3rem 4%',
                md: '8rem 7% 4rem 7%',
            }
        }}>
            <Box>
                <Box>
                    <Fade up duration={1500}>
                        <Typography variant="h3" sx={titles.title}>
                        our <Typography variant="body" sx={{
                            color: 'var(--accent)',
                        }}>Gallery</Typography>
                        </Typography>
                    </Fade>
                </Box>
                <Fade up duration={1500}>
                <Typography variant="body2" sx={{
                    width: {
                        md: '55%'
                    },
                    maxWidth: '600px',
                    margin: '2.2rem 0 1.5rem 0'
                }}>Welcome to our gallery! Here, you can explore a vibrant collection of images showcasing our events, activities, and student achievements. Each photo captures the spirit of our community and highlights the creativity and talent of our students. Dive in to see memorable moments and get a glimpse of life in our department!</Typography>
                </Fade>
                <Fade up delay={400} duration={1500}>
                <Button
                    onClick={() => {
                        window.location.href="/gallery";
                    }}
                    text="See more"
                 />
                 </Fade>
            </Box>
            <Fade left duration={1500}>
                <Box sx={{
                    marginTop: '3.2rem',
                    width: {
                        xs: '90%',
                        sm: '80%',
                    },
                    maxWidth: '640px',
                    height: '1px',
                    background: 'var(--color1)'
                }} />
            </Fade>

            <Box sx={{
                margin: {
                    xs: '2rem 0',
                    md: '4rem 0'
                } 
            }}>
                <Fade duration={1500}>
                    <MainGallery />
                </Fade>
            </Box>

            <Fade right duration={1500}>
            <Box sx={{
                float: 'right',
                width: {
                    xs: '90%',
                    sm: '80%',
                },
                maxWidth: '640px',
                height: '1px',
                background: 'var(--accent)'
            }} />
            </Fade>
        </Box>
    );
}

export default Gallery;
