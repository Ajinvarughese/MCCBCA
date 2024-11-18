import { Box, ImageList, ImageListItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Data from "../../Hooks/Data";

const itemData = Data().gallery;

const MainGallery = () => {
    const listRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        let animationFrame;

        const smoothScroll = () => {
            if (listRef.current) {
                const maxScrollLeft = listRef.current.scrollWidth - listRef.current.clientWidth;

                // Reset to start if at the end
                if (listRef.current.scrollLeft >= maxScrollLeft) {
                    listRef.current.scrollLeft = 0;
                } else {
                    listRef.current.scrollBy({
                        left: 1, // Adjust speed of smooth scrolling
                        behavior: "auto",
                    });
                }
            }
            animationFrame = requestAnimationFrame(smoothScroll);
        };

        animationFrame = requestAnimationFrame(smoothScroll);
        return () => cancelAnimationFrame(animationFrame); // Cleanup on unmount
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                height: "10vh",
                display: "flex",
                alignItems: "center",
                minHeight: {
                    xs: "140px",
                    sm: "240px",
                },
                overflow: "hidden",
            }}
        >
            <ImageList
                sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "scroll",
                    width: "100%",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                    gap: "2rem",
                    scrollBehavior: "smooth", // Enable smooth scrolling behavior
                }}
                rowHeight={width < 700 ? (width < 460 ? 140 : 220) : 280}
                ref={listRef}
            >
                {itemData.map((item) => (
                    <ImageListItem
                        key={item.img}
                        sx={{
                            flexShrink: 0,
                            width: { xs: "270px", sm: "290px", md: "390px" },
                            margin: "0 1%",
                        }}
                    >
                        <img
                            style={{
                                borderRadius: "6px",
                                width: "100%",
                                height: "100%",
                                display: "block",
                            }}
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
