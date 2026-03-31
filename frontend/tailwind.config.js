/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#F8E8EE',
          'pink-dark': '#E8B4C8',
          'pink-deep': '#D4919E',
          lavender: '#E8E0F0',
          'lavender-dark': '#C4B0D8',
          'lavender-deep': '#A088B8',
          mint: '#E0F0E8',
          'mint-dark': '#A8D8B8',
          'mint-deep': '#7CC49A',
          sky: '#E0ECF8',
          'sky-dark': '#A8C8E8',
          'sky-deep': '#7CA8D4',
          peach: '#FDE8D8',
          'peach-dark': '#F0C0A0',
          'peach-deep': '#E8A070',
          cream: '#FFF8F0',
          'cream-dark': '#F0E0D0',
          yellow: '#FFF3D6',
          'yellow-dark': '#F0D878',
          coral: '#F8A0A0',
          'coral-dark': '#E07878',
        }
      },
      fontFamily: {
        'display': ['"Nunito"', 'sans-serif'],
        'body': ['"Quicksand"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'glow-pink': '0 0 30px rgba(232, 180, 200, 0.3)',
        'glow-lavender': '0 0 30px rgba(196, 176, 216, 0.3)',
        'glow-mint': '0 0 30px rgba(168, 216, 184, 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '96rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #F8E8EE 0%, #E8E0F0 50%, #E0ECF8 100%)',
        'card-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F8F4FF 100%)',
      },
    },
  },
  plugins: [],
}
