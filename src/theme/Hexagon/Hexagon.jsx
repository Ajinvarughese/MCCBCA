import { Box, Typography } from "@mui/material";

const Hexagon = (prop) => {
    const hexagonPath = "M79.67433714816835 3.9999999999999996Q86.60254037844386 0 93.53074360871938 3.9999999999999996L166.27687752661222 46Q173.20508075688772 50 173.20508075688772 58L173.20508075688772 142Q173.20508075688772 150 166.27687752661222 154L93.53074360871938 196Q86.60254037844386 200 79.67433714816835 196L6.92820323027551 154Q0 150 0 142L0 58Q0 50 6.92820323027551 46Z";
    return (
        <Box>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 173.20508075688772 200">
                <defs>
                    <clipPath id="hexClip">
                        <path d={hexagonPath} />
                    </clipPath>
                </defs>

                {!prop.details ? (
                    <>
                        <path 
                            stroke="var(--color1)" 
                            strokeWidth="3"  
                            fill="transparent" 
                            d={hexagonPath}
                        />
                        <image 
                            href={prop.img} 
                            width="100%" 
                            height="100%" 
                            display="block" 
                            clipPath="url(#hexClip)" 
                            preserveAspectRatio="xMidYMid slice" 
                        />
                    </>
                ) : (
                    <>
                        <path 
                            fill="transparent" 
                            stroke="var(--accent)" 
                            strokeWidth="2" 
                            d={hexagonPath} 
                        />


                        <text 
                            x="18%"  
                            y="35%"        
                            textAnchor="left" 
                            alignmentBaseline="left" 
                            fill="var(--color1)" 
                            fontSize="16"
                            fontWeight="600"
                        >
                            {prop.content.name}
                        </text>

 
                        <text 
                            x="18%"  
                            y="48%"        
                            textAnchor="left" 
                            alignmentBaseline="left" 
                            fill="var(--color1)" 
                            fontSize="15"

                        >
                            {prop.content.title}
                        </text>

                        
                        <text 
                            x="18%"  
                            y="61%"  
                            textAnchor="left" 
                            alignmentBaseline="left" 
                            fill="var(--color1)" 
                            fontSize="15"
                        >
                            {prop.content.qualification}
                        </text>
                    </>

                )}
            </svg>
        </Box>
    );
}

export default Hexagon;
