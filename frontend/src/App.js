import './styling/App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import About from './components/About'
import Menu from './components/Menu'
import Checkout from './components/Checkout'
import HomeScreen from './components/HomeScreen'
import Build from './components/Build'
import Profile from './components/Profile'
import Testimonies from './components/Testimonies'
import ErrorPage from './components/ErrorPage';
import Individual from './components/Individual';
import Login from './components/Login';
import LoggingIn from './components/LoggingIn';
import SignUp from './components/SignUp';
import Update from './components/Update'
import CheckoutSuccess from './components/CheckoutSuccess';
import CompleteOrder from './components/CompleteOrder';

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<><Navbar /> <HomeScreen /></>} />
          <Route path='/about' element={<><Navbar /> <About /></>} />
          <Route path='/menu' element={<><Navbar /> <Menu /></>}/>
          <Route path='/menu/:id' element={<><Navbar /><Individual /></>} />
          <Route path='/checkoutSuccess' element={<CheckoutSuccess />} />
          <Route path='/checkout' element={<><Navbar /> <Checkout /></>} />
          <Route path='/completeOrder' element={<CompleteOrder />} />
          <Route path='/build' element={<><Navbar /> <Build /></>} />
          <Route path='/login' element={<><Navbar /> <Login /></>} />
          <Route path='/loggingin' element={<LoggingIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/menu/update/:id' element={<><Navbar /> <Update /></>} />
          <Route path='/profile' element={<><Navbar /> <Profile /></>} />
          <Route path='/testimonies' element={<><Navbar /> <Testimonies /></>} />
          <Route path='*' element={<><Navbar /> <ErrorPage /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
