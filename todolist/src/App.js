import { BrowserRouter , Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from './pages/AddEdits';
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position='top-center' />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/add' component={<AddEdit />} />
          <Route path='/update/:id' component={AddEdit} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
