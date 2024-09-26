const Style = () => {
    return {
        body: {
            height: '100vh',
            minHeight: '569px',
        },
        subTitle: {
            fontFamily: "'VALORANT', sans-serif",
            color: '#ff4655',
            fontSize: {
                xs: 'clamp(1.3rem, 2vw, 1.9rem)',
                sm: '1.9rem',
            },
            textAlign: 'center',
        },
        title: {
            textAlign: 'center',
            color: '#fff',
            fontSize: {
                xs: 'clamp(2.2rem, 3.2rem, 4.5rem)',
                sm: '4.6rem',
                md: '6rem'
            },
            fontFamily: "'VALORANT', sans-serif",

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
            color: '#fff',
        },
         down: {
            animation: 'float 2s ease-in-out infinite', 
            '@keyframes float': {
            '0%': {
                transform: 'translateY(0)', 
            },
            '50%': {
                transform: 'translateY(7px)', 
            },
            '100%': {
                transform: 'translateY(0)', 
            },
            },
        },
    }
}
export default Style;