module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.tsx'
  ],
  purge: {
    safelist: ['opacity-100', 'opacity-50', 'opacity-25']
  },
  theme: {
    fontFamily: {
      sans: ['"Comfortaa"']
    }
  }
}
