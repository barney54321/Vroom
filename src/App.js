import './App.css';
import Page from './Components/Page';
import 'bootstrap/dist/css/bootstrap.min.css';
import {VroomContextProvider} from "./Components/Common/VroomContext";


function App() {
  return (
    <div className="App">
      <VroomContextProvider >
        <Page />
      </VroomContextProvider>
    </div>
  );
}

export default App;
