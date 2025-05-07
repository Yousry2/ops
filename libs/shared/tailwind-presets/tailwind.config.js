// tailwind.config.js
module.exports = {
    safelist: [
        {
            pattern: /pl-.+/,
        },
    ],
    theme: {
        extend: {
            colors: {
                surface: 'var(--color-surface)',
                hover: 'var(--color-hover)',
                'on-surface': 'var(--color-on-surface)',
                border: 'var(--color-border)',
                primary: 'var(--color-primary)',
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    600: 'var(--color-primary)',
                },
            },
            fontSize: {
                base: 'var(--font-size-base)',
            },
            borderRadius: {
                DEFAULT: 'var(--border-radius)',
            },
            extend: {
                spacing: {
                    'item-selector': 'var(--spacing-item-selector)',
                },
            },
        },
    },
};
