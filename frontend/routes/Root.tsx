import cx from 'clsx'
import type { NavLinkProps } from 'react-router-dom'
import { NavLink, Outlet } from 'react-router-dom'

const NavButton = ({ children, ...props }: NavLinkProps) => (
  <NavLink className={({ isActive }) => cx('text-sm font-medium', isActive && 'underline')} {...props}>
    {children}
  </NavLink>
)

export default function RootRoute() {
  return (
    <main className="flex flex-col gap-6">
      <nav className="border-b border-gray-200 bg-gray-100 p-4">
        <div className="container mx-auto flex gap-6">
          <NavButton to="/">Home</NavButton>
          <NavButton to="/about">About</NavButton>
        </div>
      </nav>
      <div className="container mx-auto pb-12">
        <Outlet />
      </div>
    </main>
  )
}
