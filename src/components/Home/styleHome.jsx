const Style = () => {
    return {
        body: {
            height: '100vh',
            minHeight: '569px',
        },
        subTitle: {
            fontFamily: "'Gagalin', sans-serif",
            color: '#fff',
            fontSize: {
                xs: 'clamp(2.5rem, 2vw, 3.6rem)',
                sm: '3.3rem',
                md: '4.5rem',
            },
            letterSpacing: {
                xs: '2px',  
                md: '4px',
            },
            textAlign: 'center',
        },
        title: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: {
                xs: 'clamp(7rem, 8rem, 9rem)',
                sm: '11rem',
                md: '14rem'
            },
            WebkitTextStroke: '2px #fff',
            color: 'transparent',
            fontFamily: 'horizon',
            fontFamily: "'Archivo Black', sans-serif",

            fontStyle: 'normal',
        },
        hero: {
            flex: 1,
        },
        header: {
            height: '90%', 
            maxHeight: '890px',
            minHeight: 'inherit',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
        },
        scDown: {
            textAlign: 'center',
        },
        divider: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0,
        },
        svg: {
            position: 'relative',
            display: 'block',
            width: 'calc(100% + 1.3px)',
            height: '81px',
            transform: 'rotateY(180deg)',
        },
        shapeFill: {
            fill: '#FFFFFF',
        }
    }
}
export default Style;