import Header from './components/Header';
import { ThemeProvider } from '@material-ui/styles';
import defaultTheme from './themes/defaultTheme';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
