import { Box, Typography } from "@mui/material";
import Background from "../../theme/Background/Background";
import Style from "./AboutStyle";
import Button from "../../theme/Button/Button";
import AboutImage from "../../assets/about.png";
import Titles from "../../theme/Style/Titles";

const titles = Titles();
const s = Style();
const About = () => {
  return (
    <Background
      b1 = {true}
      b2 = {true}
      b1Color = "var(--accent2)"
      b2Color = "var(--accent)"
    >
      <Box sx={s.aboutMain}>
        <Box sx={s.ab1}>
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
            <Typography variant="h3" sx={titles.title}>
              about <Typography variant="body" sx={s.title2}>us</Typography>
            </Typography>
          </Box>
        </Box>

        <Box sx={s.ab2}>
          <Box sx={{
            flex: 1,
            maxWidth: {
              xs: '320px',
              md:'450px'
            }
          }}>
            <img src={AboutImage} alt="about" style={s.img} />
          </Box>
          
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: {
              xs: 'center',
              md: 'flex-end'
            },
            gap: '1.5rem',
            flexDirection: 'column',
            width: '100%', 
          }}>
            <Box sx={{
              maxWidth: '662px',
            }}>
              <Typography  variant="body2" sx={{color: '#f0f0f0', textAlign: {
                  xs: 'center',
                  md: 'right',
                }}}>
                The Department of BCA (Bachelor of Computer Applications) focuses on providing students with a strong foundation in computer science and applications. It covers essential topics such as programming, database management, web development, and software engineering. The curriculum is designed to equip students with both theoretical knowledge and practical skills, preparing them for careers in IT and software development. Additionally, the department often emphasizes projects, internships, and industry collaborations to enhance real-world experience and employability.
              </Typography>
            </Box>

            <Button text="Learn more"/>
          </Box>
        </Box>

        <Box sx={{...s.ab1, flexDirection: 'row-reverse', padding: '0'}}>
          <Box sx={{
            flex: 1,
            margin: 0, // Ensure no margin is causing gaps
            padding: 0, // Remove padding if present
          }}>
            <Box sx={{
              background: 'var(--color1)',
              height: '1px',
              maxWidth: '980px',
              margin: 0, 
              padding: 0,
            }}></Box>
          </Box>
          <Box sx={{visibility: 'hidden'}}>
            <Typography variant="h3" sx={s.title}>
              about <Typography variant="body" sx={s.title2}>us</Typography>
            </Typography>
          </Box>
        </Box>


      </Box>
    </Background>
  );
};

export default About;
