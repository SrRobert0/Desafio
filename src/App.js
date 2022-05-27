import Main from './partes/main';
import Forecast from './partes/forecast';

// Separei essa parte em duas para manter mais organizado.

function App() {
  return (
    <div class="Hmm">
        <Main />
        <Forecast />

        <footer class="rodape">
          Criado por Roberto Willian
        </footer>
    </div>
  );
}

export default App;
