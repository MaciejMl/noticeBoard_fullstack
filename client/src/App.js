import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home';
import NotFound404 from './components/views/NotFound404/NotFound404';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import ReadAd from './components/pages/ReadAd/ReadAd';
import AddAd from './components/pages/AddAd/AddAd';
import Search from './components/pages/Search/Search';
import AdEdit from './components/pages/AdEdit/AdEdit';

const App = () => {
  return (
    <main>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ad/:id' element={<ReadAd />} />
          <Route path='/ad/add' element={<AddAd />} />
          <Route path='/ad/edit/:id' element={<AdEdit />} />
          <Route path='/search/:searchPhrase' element={<Search />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
};

export default App;
