const Style = () => {
    return {
        main: {
            minHeight: '569px',

            padding: {
                xs: '7rem 4% 3rem 4%',
                md: '8rem 7% 4rem 7%',
            },
        },
        mainSpacing: {

        },
        text: {
            textAlign: 'right',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: '2.2rem 0 1.5rem 0'
        },
        hexagon2: {
            position: 'absolute',
            top: '75%',
            left: "132%",
            transform: 'translate(-50%, -50%)',
            width: {
                xs: '150px',
                sm: '130px',
            }
        },

    }
}
export default Style