import {Helmet, HelmetProvider} from 'react-helmet-async'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import ScrollToHashElement from './utils/scrollToHashElement'
import ScrollToTop from './utils/scrollToTop'

const App = () => (
  <HelmetProvider>
    <Router>
      <ScrollToTop />
      <ScrollToHashElement />

      <Helmet titleTemplate={`%s | ПРОМВИЗИО`} defaultTitle={'ПРОМВИЗИО'} />

      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  </HelmetProvider>
)

export default App
