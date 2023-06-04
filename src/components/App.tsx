import {Helmet, HelmetProvider} from 'react-helmet-async'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import ScrollToHashElement from './utils/scrollToHashElement'
import ScrollToTop from './utils/scrollToTop'
import GalleryPage from './pages/gallery/GalleryPage'
import NewsPage from './pages/news/NewsPage'
import ArticlePage from './pages/article/ArticlePage'
import ProjectPage from './pages/project/ProjectPage'
import PotentialPage from './pages/potential/PotentialPage'
import {GalleryModalProvider} from './common/modal/GalleryModalContext'
import Header from './common/page/Header'

const App = () => (
  <HelmetProvider>
    <GalleryModalProvider>
      <Router>
        <ScrollToTop />
        <ScrollToHashElement />

        <Helmet titleTemplate={`%s | ПРОМВИЗИО`} defaultTitle={'ПРОМВИЗИО'} />

        <Header />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/gallery' element={<GalleryPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/news/:id' element={<ArticlePage />} />
          <Route path='/project' element={<ProjectPage />} />
          <Route path='/potential' element={<PotentialPage />} />

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </GalleryModalProvider>
  </HelmetProvider>
)

export default App
