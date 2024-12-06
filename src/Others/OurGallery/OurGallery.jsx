import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import Background from '../../theme/Background/Background';
import Titles from '../../theme/Style/Titles';
import { Box, CircularProgress, Typography } from '@mui/material';
import Navbar from '../../theme/Navbar/Navbar';
import CloseIcon from '@mui/icons-material/Close';
import ApiUrl from '../../Hooks/URL';
import { Fade } from 'easy-reveal';
import { useState, useEffect, useRef } from 'react';

const titles = Titles();
const api = ApiUrl();

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function OurGallery() {
  const [itemData, setItemData] = useState([]);
  const [items, setItems] = useState([]); // Load initial items
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const rowColumn = [[2,2], [1,1], [1, 1], [1, 2]]
  const res = async () => {
    const result = await fetch(api.api + "gallery/showAll");
    return await result.json();
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await res();
        setItemData(data); // Store the full dataset
        setItems(data.slice(0, 10)); // Load the initial 10 items
        setHasMore(data.length > 10); // Check if there are more items to load
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMoreItems = () => {
    const newItems = itemData.slice(items.length, items.length + 10); // Load 6 items at a time
    if (newItems.length === 0) {
      setHasMore(false); // No more items to load
    } else {
      setItems((prevItems) => [...prevItems, ...newItems]);
    }
  };

  const showImage = (img) => {
    setSelectedImage(img);
    setLoading(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    { threshold: 0.5 }
  );

  if (observerRef.current) {
    observer.observe(observerRef.current);
  }

  return () => {
    if (observerRef.current) {
      observer.unobserve(observerRef.current);
    }
    observer.disconnect();
  };
}, [hasMore, loading]);

useEffect(() => {
  const loadItems = async () => {
    setLoading(true); // Start loading
    const startIndex = (page - 1) * 10; // Calculate the start index based on the current page
    const endIndex = startIndex + 10; // End index for slicing
    const newItems = itemData.slice(startIndex, endIndex);

    if (newItems.length === 0) {
      setHasMore(false); // No more items to load
    } else {
      setItems((prevItems) => [...prevItems, ...newItems]);
    }
    setLoading(false); // End loading
  };

  if (page > 1 && hasMore) {
    loadItems();
  }
}, [page, hasMore, itemData]);

  


  return (
    <Background
      b1={true}
      b1Color="var(--accent2)"
    >
      <Navbar />
      <Box sx={{ 
        minHeight: '100vh',
        padding: {
          xs: '7rem 4% 3rem 4%',
          md: '8rem 7% 4rem 7%',
        }, 
      }}>
        <Box sx={{
          margin: '0 auto 2rem auto',
          width: 'fit-content',
          maxWidth: '700px',
          textAlign: 'center',
        }}>
          <Fade duration={1500} up>
            <Typography variant="h3" sx={{...titles.title, marginBottom: '0.6rem'}}>
              our <Typography variant="body" sx={{ color: 'var(--accent)' }}>Gallery</Typography>
            </Typography>
            <Typography variant='body2'>
              This gallery showcases the vibrant activities and achievements of the BCA department at Mar Chrysostom College (MCC).  
              Explore the diverse range of experiences that define our department, where learning extends beyond the classroom and into real-world innovation and community engagement.
            </Typography>
          </Fade>
        </Box>
        <ImageList
          sx={{
            maxWidth: '900px',
            margin: '0 auto',
            overflow: 'hidden',
            minHeight: '490px',
            paddingBottom: '2rem'
          }}
          variant="quilted"
          cols={4}
          rowHeight={125}
        >
          {items.map((item, index) => {
            // Determine the pattern sequence based on the current "cycle" (forward or reversed)
            const cycleIndex = Math.floor(index / rowColumn.length);
            const isReversed = cycleIndex % 2 === 1; // Odd cycles use the reversed pattern

            // Get the appropriate rows and cols based on the index and cycle direction
            const patternIndex = index % rowColumn.length;
            const [rows, cols] = isReversed ? rowColumn[rowColumn.length - 1 - patternIndex] : rowColumn[patternIndex];

            return (
                <ImageListItem sx={{ margin: '2px' }} cols={cols} rows={rows}>
                  <img
                    onClick={() => showImage(item.url)}
                    style={{ borderRadius: '6px', cursor: 'pointer' }}
                    {...srcset(item.url, 180, rows, cols)}
                    alt={item.title || 'Gallery image'}
                  />
                </ImageListItem>
            );
          })}
        </ImageList>
        {hasMore && <div ref={observerRef} style={{ height: '20px' }}></div>}
      </Box>

      <Dialog
        sx={{
          zIndex: 100000000,
          minHeight: '569px',
          height: '100vh',
          overflow: 'hidden',
        }}
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            overflow: 'auto',
            justifyContent: 'center',
            background: 'transparent',
            alignItems: 'center',
          }}
        >
          {loading && (
            <CircularProgress
              sx={{
                position: 'absolute',
                color: 'var(--accent)',
                background: 'transparent',
                zIndex: 10000,
              }}
            />
          )}
         
          <img
            src={selectedImage}
            alt="Selected"
            onLoad={handleImageLoad}
            style={{
              display: loading ? 'none' : 'block',
              maxWidth: '90%',  // Change this to fit your design
              maxHeight: '90vh', // Ensure the height is limited to the viewport height
              overflow: 'auto',
              objectFit: 'contain',  // Makes sure the whole image is visible
            }}
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            overflow: 'hidden',
          }}>
            <CloseIcon sx={{
              fontSize: '34px',
              color: "var(--dark)",
              transition: '0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.18)',
              }
            }} 
              onClick={handleClose}
            />
          </Box>
        </Box>
      </Dialog>
    </Background>
  );
}