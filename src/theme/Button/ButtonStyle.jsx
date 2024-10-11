const ButtonStyle = () => {
    return {
        button: {
            fontSize: '11px', 
            fontWeight: 'bold', 
            background: 'var(--accent)',
            color: 'var(--color1)',
            transition: '0.3s ease',
            '&:hover': {
                transform: 'scale(1.04)',
            } 
        }
    }
}

export default ButtonStyle;