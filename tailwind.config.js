/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        bebas: ['"Bebas Neue"', "cursive"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme("colors.white"),
              fontSize: "2.5rem",
              fontWeight: "700",
            },
            h2: {
              color: theme("colors.gray.200"),
              fontSize: "2rem",
              marginTop: "2rem",
            },
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.300"),
                textDecoration: "none",
              },
            },
            code: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.pink.400"),
              padding: "0.25rem",
              borderRadius: "0.25rem",
              fontSize: "0.875rem",
            },
            pre: {
              backgroundColor: theme("colors.gray.900"),
              padding: "1rem",
              borderRadius: "0.5rem",
              overflow: "auto",
            },
            blockquote: {
              borderLeftColor: theme("colors.blue.500"),
              backgroundColor: theme("colors.gray.900"),
              padding: "1rem",
              fontStyle: "italic",
            },
            // Estilo para listas
            ul: {
              listStyleType: "disc",
              paddingLeft: "1.5rem",
            },
            ol: {
              listStyleType: "decimal",
              paddingLeft: "1.5rem",
            },
            // Estilo para tablas
            table: {
              borderCollapse: "collapse",
              width: "100%",
            },
            th: {
              backgroundColor: theme("colors.gray.800"),
              padding: "0.75rem",
              borderBottom: `2px solid ${theme("colors.gray.700")}`,
            },
            td: {
              padding: "0.75rem",
              borderBottom: `1px solid ${theme("colors.gray.800")}`,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
