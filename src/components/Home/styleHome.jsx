const Style = () => {
    return {
        body: {
            height: '100vh',
            minHeight: '569px',
            position: 'relative',
        },
        subTitle: {
            fontFamily: "'VALORANT', sans-serif",
            color: '#ff4655',
            fontSize: {
                xs: 'clamp(1.7rem, 2vw, 1.9rem)',
                sm: '2.1rem',
            },
            textAlign: 'center',
        },
        title: {
            textAlign: 'center',
            color: '#fff',
            fontSize: {
                xs: 'clamp(3.3rem, 3vw, 4.9rem)',
                sm: '4.8rem',
                md: '6.2rem'
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
            top: '95%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute'
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