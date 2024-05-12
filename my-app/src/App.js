import './Layout.css';
import './App.css';
import CreateBoard from "./pages/CreateBoard.js";
import OpenBoard from './pages/OpenBoard.js';
import IndexPage from './pages/IndexPage.js';
import Layout from './Layout.js';
import {Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Layout/>}>
        <Route index element={ <IndexPage />} />
        <Route path={"/open"} element={<OpenBoard/>} />
        <Route path={"/create"} element={<CreateBoard/>} />
      </Route>

    </Routes>
  );
}

export default App;
