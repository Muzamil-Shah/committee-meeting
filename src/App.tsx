// import './App.css'
import AppRouter from './AppRouter'
import Providers from './Providers'



function App() {
  const url = new URL(window.location.href);

  console.log("pathname",url?.pathname);
  

  if (url?.pathname !== "/") {
    const baseUrl = `${window.location.origin}/#/login`;
    console.log({baseUrl});
    
    window.location.replace(baseUrl);
  }

  return (
    <Providers>
      <AppRouter />
    </Providers>
  )
}

export default App
