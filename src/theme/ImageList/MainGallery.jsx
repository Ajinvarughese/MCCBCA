import { Box, ImageList, ImageListItem, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import Data from "../../Hooks/Data";

const itemData = Data().gallery;

const MainGallery = () => {
    const listRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State for dialog image

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
        const scrollSpeed = 1; // Lower value for smoother scrolling
        const scrollInterval = 10; // Time in ms between each scroll step

        const smoothScroll = () => {
            if (isUserScrolling) {
                animationFrame = setTimeout(smoothScroll, scrollInterval);
                return;
            }

            if (listRef.current) {
                const maxScrollLeft = listRef.current.scrollWidth - listRef.current.clientWidth;

                // If at the end, jump back to the start instantly (no smooth behavior)
                if (listRef.current.scrollLeft >= maxScrollLeft) {
                    listRef.current.scrollLeft = 0;
                } else {
                    listRef.current.scrollBy({ left: scrollSpeed });
                }
            }

            animationFrame = setTimeout(smoothScroll, scrollInterval);
        };

        smoothScroll();

        return () => {
            clearTimeout(animationFrame);
        };
    }, [isUserScrolling]);

    const handleImageClick = (image) => {
        setSelectedImage(image); // Set the clicked image for the dialog
    };

    const handleClose = () => {
        setSelectedImage(null); // Close the dialog
    };

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
                                cursor: "pointer",
                            }}
                            srcSet={`${item.img}?w=1000&h=1000&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=1000&h=1000&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            onClick={() => handleImageClick(item.img)} // Handle click event
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            {/* Dialog for viewing image */}
            <Dialog open={!!selectedImage} onClose={handleClose} maxWidth="md">
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ p: 0 }}>
                    <img
                        src={selectedImage}
                        alt="Selected"
                        style={{ width: "100%", height: "auto" }}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default MainGallery;
