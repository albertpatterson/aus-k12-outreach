import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MyAppBar from './components/app_bar/app_bar.tsx';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home.tsx';
import EventList from './components/event_list/event_list.tsx';
import EventMap from './components/event_map/event_map.tsx';
import Contacts from './components/contacts/contacts.tsx';

function App() {
  return (
    <>
      <Router>
        <MyAppBar />
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/event-list" element={<EventList />} />
            <Route path="/event-map" element={<EventMap />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
