import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/pages/Home';
import { Rooms } from './components/pages/Rooms';
import { Dining } from './components/pages/Dining';
import { Spa } from './components/pages/Spa';
import { Experiences } from './components/pages/Experiences';
import { Events } from './components/pages/Events';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'rooms', Component: Rooms },
      { path: 'dining', Component: Dining },
      { path: 'spa', Component: Spa },
      { path: 'experiences', Component: Experiences },
      { path: 'events', Component: Events },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
    ],
  },
]);
