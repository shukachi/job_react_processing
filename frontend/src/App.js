import './App.css'; // Ваши основные стили

// Импортируем компоненты-секции
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import About from './components/About';
import Location from './components/Location';
import House from './components/House';
import Services from './components/Services';
import Booking from './components/Booking';
import Contacts from './components/Contacts';
import Reviews from './components/Reviews';

function App() {
  // Список секций для навигации
  const navItems = [
    { id: 'about', title: 'О нас' },
    { id: 'nearby', title: 'Местоположение' },
    { id: 'house', title: 'Домик' },
    { id: 'services', title: 'Доп услуги' },
    { id: 'booking', title: 'Бронирование' },
    { id: 'contacts', title: 'Контакты и соцсети' },
    { id: 'reviews', title: 'Отзывы' },
  ];

  return (
    <div className="palette-nature">
      <Header />
      <div className="container">
        <Sidebar navItems={navItems} />
        <main className="content">
          <About />
          <Location />
          <House />
          <Services />
          <Booking />
          <Contacts />
          <Reviews />
        </main>
      </div>
    </div>
  );
}

export default App;
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
