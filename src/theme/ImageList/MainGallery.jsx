import { Box, ImageList, ImageListItem} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Data from "../../Hooks/Data";

const itemData = Data().gallery;

const MainGallery = () => {
    const listRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [scrollSpeed, setScrollSpeed] = useState(1); // Initialize scroll speed

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (listRef.current) {
                const maxScrollLeft = listRef.current.scrollWidth - listRef.current.clientWidth;

                if (listRef.current.scrollLeft >= maxScrollLeft) {
                    // Reset to start with a slower scroll
                    listRef.current.scrollTo({
                        left: 0,
                        behavior: 'smooth',
                    });
                   
                    setScrollSpeed(2000); // Slow down the interval after reset
                } else {
                    // Scroll by one image width, then speed up again
                    listRef.current.scrollBy({
                        left: 4, // Adjust to match the image width
                        behavior: 'smooth',
                    });
                    setScrollSpeed(1); // Regular fast scrolling
                }
            }
        }, scrollSpeed); // Use dynamic speed

        return () => clearInterval(scrollInterval); // Clean up interval on unmount
    }, [scrollSpeed, width]); 

    return (
        <Box sx={{
            position: 'relative',
            height: '10vh',
            display: 'flex',
            alignItems: 'center',
            minHeight: {
              xs: '140px',
              sm: '240px',
            },
            overflow: 'hidden',
        }}>
            <ImageList
                sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'scroll', 
                    width: '100%',
                    scrollbarWidth: 'none', 
                    '&::-webkit-scrollbar': {
                        display: 'none', 
                    },
                    gap: '2rem',
                }}
                rowHeight={width < 700 ? (width < 460 ? 140 : 190) : 260}
                ref={listRef}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} sx={{ flexShrink: 0, width: { xs: 'auto', sm: '240px', md: '390px' }, margin: '0 1%' }}>
                        <img
                            style={{ borderRadius: '6px', width: '100%', height: '100%', display: 'block' }}
                            srcSet={`${item.img}?w=1000&h=1000&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=1000&h=1000&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
};

export default MainGallery;