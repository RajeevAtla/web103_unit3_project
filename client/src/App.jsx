import { Link, useLocation, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BuildPage from './pages/BuildPage'
import BikeDetailsPage from './pages/BikeDetailsPage'
import EditBikePage from './pages/EditBikePage'
import './App.css'

const App = () => {
  const location = useLocation()

  const element = useRoutes([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/build',
      element: <BuildPage />
    },
    {
      path: '/bikes/:bikeId',
      element: <BikeDetailsPage />
    },
    {
      path: '/bikes/:bikeId/edit',
      element: <EditBikePage />
    }
  ])

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <header className="topbar">
        <Link className="brandmark" to="/">
          <span className="brandmark-kicker">DIY Delight</span>
          <span className="brandmark-title">Velocraft Garage</span>
        </Link>

        <nav className="topbar-nav" aria-label="Primary">
          <Link
            className={location.pathname === '/' ? 'nav-link nav-link-active' : 'nav-link'}
            to="/"
          >
            Garage
          </Link>
          <Link
            className={location.pathname === '/build' ? 'nav-link nav-link-active' : 'nav-link'}
            to="/build"
          >
            Build a Bike
          </Link>
        </nav>
      </header>

      <main className="page-shell">{element}</main>
    </div>
  )
}

export default App
