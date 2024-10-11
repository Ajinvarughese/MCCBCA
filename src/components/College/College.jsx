import { Box, Typography } from "@mui/material";
import Background from "../../theme/Background/Background";
import Style from "./style";
import Button from "../../theme/Button/Button";
import mcc from '../../assets/mcc.jpg';
import Titles from "../../theme/Style/Titles";

const titles = Titles();

const s= Style();
const College = () => {
    return(
        <Background
            b1 = {true}
            b2 = {false}
            b1Color = "var(--accent2)"
            >
            <Box sx={s.main} >
                <Box sx={{display: 'flex', alignItems: 'center', gap: '1.5rem',}}>
                    <Typography variant="h3" sx={titles.title}>
                    our <Typography variant="body" sx={{
                        color: 'var(--accent)',
                    }}>college</Typography>
                    </Typography>

                    <Box sx={{flex: 1, height: '1px', background: 'var(--color1)'}}></Box>
                </Box>
                <Box sx={s.header}>
                    <Box sx={{ flex: 1, maxWidth: '800px', padding: '0 1.2rem'}}>
                        <Typography variant="body2" sx={{
                            width: '100%',
                            maxWidth: '800px',
                            margin: '2.2rem 0 1.5rem 0'
                        }}>
                            Mar Chrysostom College is a dream venture of the Catholic Diocese of Pathanamthitta which owes its
                            existence to the farsighted vision of its founder His Excellency Yoohanon Mar Chrysostom. 
                            Started in June 2014 as a self financing college affiliated to the University of Kerala, it is determined 
                            to provide quality education by inculcating ethical, social and human values in students who are in 
                            exploration of a brilliant career.!
                        </Typography>
                        <Button text="See more"/>

                        <Box sx={s.number}>
                            <Box sx={s.i}>
                                <Typography variant="h3">237</Typography>
                                <Typography variant="body2">college</Typography>
                            </Box>
                            <Box sx={s.i}>
                                <Typography variant="h3">47</Typography>
                                <Typography variant="body2">college</Typography>
                            </Box>
                            <Box sx={s.i}>
                                <Typography variant="h3">7</Typography>
                                <Typography variant="body2">college</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        flex: 1,  
                        position: 'relative', 
                        width: 'fit-content', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{...s.img, position: 'relative', zIndex: 2}}> 
                            <Box>
                                <img style={{ 
                                        width: '130%',
                                        transform: 'translateX(-5%)',
                                        maxHeight: '270px',
                                        display: 'block',
                                    }} 
                                    src={mcc} 
                                    alt="Mar Chrysostom College Paranthal, Adoor" 
                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: {
                                xs: '130%',
                                md: '100%',
                            },
                            maxWidth: '600px',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1,  // Lower zIndex to send the SVG to the back
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.dev/svgjs" version="1.1" viewBox="0 0 800 800" opacity="1" width="100%" height="100%">
                                <defs>
                                <filter id="bbblurry-filter" x="-100%" y="-100%" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feGaussianBlur stdDeviation="100" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur" />
                                </filter>
                                </defs>
                                <g filter="url(#bbblurry-filter)">
                                <ellipse rx="150" ry="150" cx="391.74648359447326" cy="372.9616056545448" fill="var(--accent)" />
                                </g>
                            </svg>
                        </Box>
                    </Box>


                </Box>

                <Box sx={{display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.5rem',
                    marginTop: {
                        xs: '4.5rem',
                        md: '6rem',
                    },
                }}>
                    <Box sx={{flex: 1, height: '1px' , background: 'var(--accent)'}}></Box>
                    <Typography variant="h3" sx={{
                        visibility: 'hidden',
                        fontFamily: 'var(--titleFont)',
                        color: 'var(--color1)',
                    }}>
                        college
                    </Typography>
                </Box>
            </Box>
        </Background>
    );
}

export default College;