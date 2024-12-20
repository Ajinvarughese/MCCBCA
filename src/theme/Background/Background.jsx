import { Box } from "@mui/material";




  const Background = ({ children, b1, b2, b1Color, b2Color, b2Style}) => {
    
    const style = {
    body: {
      minHeight: '568px',
      background: 'var(--bg)',
      zIndex: 0,
      width: '100%',
      overflow: 'hidden',
      scroll: 'hidden',
      position: 'relative',
    },
    b1: {
      position: 'absolute',
      top: '-80px',
      left: '-80px',
      zIndex: -1,
      transform: 'translate(-50%, -50%)',
      animation: 'scalePulse 4s ease-in-out infinite',
    },
    b2: {
      position: 'absolute',
      zIndex: -1,
      bottom: b2Style ? '0' :'-120px',
      top: b2Style? '50%': 0, 
      right: '-120px',
      transform: b2Style ? 'translate(60%, -50%)' : 'translate(55%, 50%)',
      animation: 'scalePulse 4s ease-in-out infinite',
    }
  };


  const styles = `
    @keyframes scalePulse {
      0%, 100% {
        scale: 1 
      }
      50% {
        scale: 1.1 
      }
    }
  `;
  
  return (
      <Box sx={style.body}>
        <style>{styles}</style>
        {/* Background elements */}
        <Box sx={{
            ...style.b1,
            display: b1 ? "block" : "none",
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.dev/svgjs" version="1.1" viewBox="0 0 800 800" opacity="0.79" width="1200" height="1200">
            <defs>
              <filter id="bbblurry-filter" x="-100%" y="-100%" width="500%" height="500%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="100" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur" />
              </filter>
            </defs>
            <g filter="url(#bbblurry-filter)">
              <ellipse rx="150" ry="150" cx="391.74648359447326" cy="372.9616056545448" fill={b1Color} />
            </g>
          </svg>
        </Box>

        <Box sx={{
          ...style.b2,
          display: b2 ? "block" : "none",
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.dev/svgjs" version="1.1" viewBox="0 0 800 800" opacity="0.79" width="1200" height="1200">
            <defs>
              <filter id="bbblurry-filter" x="-100%" y="-100%" width="500%" height="500%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="100" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur" />
              </filter>
            </defs>
            <g filter="url(#bbblurry-filter)">
              <ellipse rx="150" ry="150" cx="391.74648359447326" cy="372.9616056545448" fill={b2Color} />
            </g>
          </svg>
        </Box>


        <Box sx={{zIndex: 1000}}>
          {children}
        </Box>
      </Box>
  );
};

export default Background;
