import { Box, Typography } from "@mui/material";
import Button from "../../theme/Button/Button";
import Background from "../../theme/Background/Background";
import ScrollType from "../../theme/ImageList/ScrollType";
const Gallery = () => {
    return(
        <Background
            b2 = {true}
            b2Color="var(--accent2)"
        >
            <Box sx={{
                minHeight: '569px', 
                padding: {
                    xs: '7rem 4% 3rem 4%',
                    md: '8rem 7% 4rem 7%',
                }
            }}>
                <Box>
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
                    <Typography variant="body2" sx={{
                        width: {
                            md: '55%'
                        },
                        margin: '2.2rem 0 1.5rem 0'
                    }}>Welcome to our gallery! Here, you can explore a vibrant collection of images showcasing our events, activities, and student achievements. Each photo captures the spirit of our community and highlights the creativity and talent of our students. Dive in to see memorable moments and get a glimpse of life in our department!</Typography>
                    <Button text="See more"/>
                </Box>

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

                <Box sx={{
                    margin: {
                        xs: '2rem 0',
                        md: '4rem 0'
                    } 
                }}>
                    <ScrollType />
                </Box>

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
            </Box>
        </Background>
    );
}

export default Gallery;
