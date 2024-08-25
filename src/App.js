import './App.css';
import { AppRouter } from './AppRouter';
import { Footer, Navigation } from './components';
import { PokemonProvider } from './context/PokemonProvider';

function App() {
  return (
    <PokemonProvider>
      <Navigation/>
      <AppRouter />
      <Footer/>
    </PokemonProvider> 
    )
}

export default App;
