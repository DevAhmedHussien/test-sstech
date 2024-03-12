
import MainForm from './components/MainForm';
import './App.css';
import MyProvider from './Context/MyProvider';
import {ThemeProvider} from '@mui/material';
import {useMode} from './Context/ThemeProvider';
import './App.css';
function App() {
const [theme] = useMode();
  return (
  <ThemeProvider  theme={theme}>
    <MyProvider>
      <div className="App">
        <MainForm/>
      </div>
    </MyProvider>
  </ThemeProvider>
  );
}

export default App;
