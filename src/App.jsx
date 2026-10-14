import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import Location from './components/Location.jsx';
import Reviews from './components/Reviews.jsx';
import Booking from './components/Booking.jsx';
import Footer from './components/Footer.jsx';

const SECTIONS = [
  { id: 'home', Component: Hero },
  { id: 'services', Component: Services },
  { id: 'about', Component: WhyChooseUs },
  { id: 'address', Component: Location },
  { id: 'reviews', Component: Reviews },
  { id: 'book', Component: Booking },
];

export default function App() {
  return (
    <>
      <Header />
      <Box component="main">
        {SECTIONS.map(({ id, Component }, i) => (
          <Box key={id}>
            {i > 0 && <Divider />}
            <Component />
          </Box>
        ))}
      </Box>
      <Footer />
    </>
  );
}
