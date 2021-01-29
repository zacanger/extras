const App = props => {
  const location = props.state.navigation.location // or whatever

  switch (location.name) {
    case 'home':
      return <Home {...props} id={location.options.id} />
    case 'about':
      return <About {...props} id={location.options.id} />
    // etc.
    default:
      return <span>4040404040404!</span>
  }
}
