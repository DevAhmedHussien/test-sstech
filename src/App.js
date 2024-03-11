
import MainForm from './components/MainForm';
import './App.css';
import MyProvider from './Context/MyProvider';

function App() {
  return (
    <MyProvider>
      <div className="App">
        <MainForm/>
      </div>
    </MyProvider>
  );
}

export default App;
