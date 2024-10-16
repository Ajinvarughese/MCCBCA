import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import Background from '../../theme/Background/Background';
import Titles from '../../theme/Style/Titles';
import { Box, CircularProgress, Typography } from '@mui/material';
import Navbar from '../../theme/Navbar/Navbar';
import CloseIcon from '@mui/icons-material/Close';

const titles = Titles();

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function OurGallery() {
  const [items, setItems] = React.useState(itemData.slice(0, 6)); // Load initial items
  const [page, setPage] = React.useState(1);
  const observerRef = React.useRef();
  const [hasMore, setHasMore] = React.useState(true); // Flag to stop loading when no more data
  const [loading, setLoading] = React.useState(true);

  const [selectedImage, setSelectedImage] = React.useState(null); // State to hold the selected image
  const [open, setOpen] = React.useState(false); // State to control the dialog open/close

  const loadMoreItems = () => {
    const newItems = itemData.slice(items.length, items.length + 6); // Load 6 items at a time
    if (newItems.length === 0) {
      setHasMore(false); // No more items to load
    } else {
      setItems((prevItems) => [...prevItems, ...newItems]);
    }
  };

  const showImage = (img) => {
    setSelectedImage(img); // Set the clicked image
    setLoading(true); // Set loading to true when the image is selected
    setOpen(true); // Open the dialog to show the image
  };


  const handleClose = () => {
    setOpen(false); // Close the dialog
    setLoading(false);
  };

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false when image finishes loading
  };


  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, { threshold: 0.5 });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  React.useEffect(() => {
    if (page > 1 && hasMore) {
      loadMoreItems();
    }
  }, [page, hasMore]);

  return (
    <Background
      b1 = {true}
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
          <Typography variant="h3" sx={{...titles.title, marginBottom: '0.6rem'}}>
            our <Typography variant="body" sx={{
              color: 'var(--accent)',
            }}>Gallery</Typography>
          </Typography>
          <Typography variant='body2'>
            This gallery showcases the vibrant activities and achievements of the BCA department at Mar Chrysostom College (MCC).  
            Explore the diverse range of experiences that define our department, where learning extends beyond the classroom and into real-world innovation and community engagement.
          </Typography>
        </Box>
        <ImageList
          sx={{
            maxWidth: '900px',
            margin: '0 auto',
          }}
          variant="quilted"
          cols={4}
          rowHeight={125}
        >
          {items.map((item, index) => (
            <ImageListItem sx={{ margin: '2px' }} key={index} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                onClick={() => showImage(item.img)} // Pass the image to showImage
                style={{
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
                {...srcset(item.img, 141, item.rows, item.cols)}
                alt={item.title}
                
              />
            </ImageListItem>
          ))}
        </ImageList>
        {hasMore && <div ref={observerRef} style={{ height: '20px' }}></div>}
      </Box>

      {/* Full-screen image modal */}
      <Dialog
        sx={{
          zIndex: 100000000,
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
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading && ( // Show loading spinner while image is loading
            <CircularProgress
              sx={{
                position: 'absolute',
                color: 'var(--accent)',
                background: 'transparent',
                zIndex: 10000, // Make sure the spinner is above the image
              }}
            />
          )}
          <img
            src={selectedImage}
            alt="Selected"
            onLoad={handleImageLoad} // Set loading to false when image loads
            style={{
              display: loading ? 'none' : 'block', // Hide the image while loading
              width: '100%',
              overflow: 'hidden',
              height: 'auto',
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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];
