import CurrentConditions from './components/CurrentConditions';
import Chart from './components/Chart';
import SearchBar from './components/SearchBar';
import AppProvider from './AppProvider'
import 'antd/dist/antd.css';

function App() {
  return (
    <AppProvider>
      <SearchBar/>
      <Chart/>
      <CurrentConditions />
    </AppProvider>
  );
}

export default App;
