module.exports = {
        safelist: [
            {
              pattern: /pl-.+/,
            }
    ],
    theme: {
        extend: {
            colors: {
                surface: 'hsl(0, 0%, 100%)',
                hover: 'hsl(0, 0%, 96%)',
                'on-surface': 'hsl(195, 3%, 24%)',
                border: 'hsl(210, 0%, 89%)',
                primary: {
                    DEFAULT: 'hsl(213, 97%, 53%)',
                    600: 'hsl(213, 97%, 53%)',
                },
            },

            fontSize: {
                base: '14px',
            },

            borderRadius: {
                DEFAULT: '3px',
            },
            spacing: {
                'item-selector': '275px',
            },
        },
    },
    plugins: [],
};
