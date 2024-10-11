const Style = () => {
    return {
        title: {
            fontFamily: 'var(--titleFont)',
            color: 'var(--color1)',
        },
        title2: {
            color: 'var(--accent)',
        },
        main: {
            padding: {
                xs: '7rem 4% 3rem 4%',
                md: '8rem 7% 4rem 7%',
            },
        },
        number: {
            marginTop: '4rem',
            display: 'flex',
            maxWidth: {
                md: '90%',
            },
            justifyContent: 'space-between',
        },
        i: {
            textAlign: 'center',
        },
        header: {
            display: 'flex',
            gap: '1rem',
            flexDirection: {
                xs: 'column-reverse',
                md: 'row'
            },
            alignItems: 'center',
            textAlign: {
                xs: 'center',
                md: 'left',
            },
            marginTop: '3rem',
            minHeight: '300px', 
        },
        img: {
            margin: 'auto 0', 
            maxWidth: {
                xs: '440px',
                md: '340px',
                lg: '440px',
            }, 
          
            border: '2px solid var(--color1)',
            borderRadius: '10px',
            overflow: 'hidden' 
        }
    }
}
export default Style;