import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Activities from './pages/Activities'
import ThankYou from './pages/ThankYou'
import Contact from './pages/Contact'
import AccessPin from './pages/AccessPin'
import BlogList from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ProductRouter from './pages/products/ProductRouter'
import AdminLogin from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminUsers from './pages/Admin/Users'
import AdminProducts from './pages/Admin/Products'
import AdminBlog from './pages/Admin/Blog'
import BlogEditor from './pages/Admin/BlogEditor'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chi-sono" element={<About />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="attivita" element={<Activities />} />
        <Route path="grazie" element={<ThankYou />} />
        <Route path="contatti" element={<Contact />} />
        <Route path="accesso-pin" element={<AccessPin />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="admin/utenti" element={
          <ProtectedRoute>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="admin/prodotti" element={
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        } />
        <Route path="admin/blog" element={
          <ProtectedRoute>
            <AdminBlog />
          </ProtectedRoute>
        } />
        <Route path="admin/blog/new" element={
          <ProtectedRoute>
            <BlogEditor />
          </ProtectedRoute>
        } />
        <Route path="admin/blog/:id/edit" element={
          <ProtectedRoute>
            <BlogEditor />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="/prodotto/:productId/:chapterId?" element={<ProductRouter />} />
    </Routes>
  )
}

export default App
