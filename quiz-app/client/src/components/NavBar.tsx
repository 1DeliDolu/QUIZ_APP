import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const linkBase = 'block px-3 py-2 rounded hover:bg-gray-100'
  const activeBase = 'text-blue-700 font-medium'

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded md:hidden border px-2 py-1"
              aria-controls="main-menu"
              aria-expanded={open}
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="i">☰</span>
            </button>
            <Link to="/" className="text-lg font-semibold">
              QUIZ
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6 w-full md:w-auto md:ml-8" id="main-menu">
            <ul className="flex items-center gap-2 flex-wrap">
              <li><NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Einführung</NavLink></li>
              <li><NavLink to="/einfuehrung-in-diesen-lehrplan" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Einführung in diesen Lehrplan</NavLink></li>
              <li><NavLink to="/grundlagen-des-testens" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Grundlagen des Testens</NavLink></li>
              <li><NavLink to="/softwareentwicklungslebenszyklus" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Softwareentwicklungslebenszyklus</NavLink></li>
              <li><NavLink to="/statischer-test" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Statischer Test</NavLink></li>
              <li><NavLink to="/management-der-testaktivitaete" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Management der Testaktivitäte</NavLink></li>
              <li><NavLink to="/risikomanagement" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Risikomanagement</NavLink></li>
              <li><NavLink to="/testueberwachung-teststeuerung-und-testabschluss" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Testüberwachung, Teststeuerung und Testabschluss</NavLink></li>
              <li><NavLink to="/testwerkzeuge" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Testwerkzeuge</NavLink></li>
              <li><NavLink to="/udemy" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Udemy</NavLink></li>
              <li><NavLink to="/cms" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>CMS</NavLink></li>
            </ul>
            <form
              className="ml-auto flex items-center gap-2"
              role="search"
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget as HTMLFormElement
                const data = new FormData(form)
                const q = String(data.get('q') || '')
                // TODO: hook up real search
                console.log('search:', q)
              }}
            >
              <input
                name="q"
                className="border rounded px-3 py-2 text-sm"
                placeholder="Search"
                aria-label="Search"
              />
              <button type="submit" className="border rounded px-3 py-2 text-sm hover:bg-gray-100">
                Search
              </button>
            </form>
            <div className="ml-4 flex items-center gap-2">
              {user ? (
                <>
                  <NavLink to="/profil" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Profil</NavLink>
                  <button onClick={logout} className="border rounded px-3 py-2 text-sm hover:bg-gray-100">Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Login</NavLink>
                  <NavLink to="/register" className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Registrieren</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t" id="main-menu">
          <ul className="px-4 py-2 space-y-1">
            {[
              { to: '/', label: 'Einführung', end: true },
              { to: '/einfuehrung-in-diesen-lehrplan', label: 'Einführung in diesen Lehrplan' },
              { to: '/grundlagen-des-testens', label: 'Grundlagen des Testens' },
              { to: '/softwareentwicklungslebenszyklus', label: 'Softwareentwicklungslebenszyklus' },
              { to: '/statischer-test', label: 'Statischer Test' },
              { to: '/management-der-testaktivitaete', label: 'Management der Testaktivitäte' },
              { to: '/risikomanagement', label: 'Risikomanagement' },
              { to: '/testueberwachung-teststeuerung-und-testabschluss', label: 'Testüberwachung, Teststeuerung und Testabschluss' },
              { to: '/testwerkzeuge', label: 'Testwerkzeuge' },
              { to: '/udemy', label: 'Udemy' },
              { to: '/cms', label: 'CMS' },
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end as any}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <form
                className="flex items-center gap-2 px-1 pb-3"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.currentTarget as HTMLFormElement
                  const data = new FormData(form)
                  const q = String(data.get('q') || '')
                  console.log('search:', q)
                  setOpen(false)
                }}
              >
                <input
                  name="q"
                  className="border rounded px-3 py-2 text-sm w-full"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button type="submit" className="border rounded px-3 py-2 text-sm">
                  Go
                </button>
              </form>
            </li>
            <li className="px-1 pb-3 flex items-center gap-2">
              {user ? (
                <>
                  <NavLink to="/profil" onClick={() => setOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Profil</NavLink>
                  <button onClick={() => { logout(); setOpen(false) }} className="border rounded px-3 py-2 text-sm">Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Login</NavLink>
                  <NavLink to="/register" onClick={() => setOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? activeBase : 'text-gray-700'}`}>Registrieren</NavLink>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
