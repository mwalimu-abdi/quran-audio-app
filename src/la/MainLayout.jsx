import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header className="header">
        <h2>Friday Khutbahs by Sheikh Mohamed</h2>

        <nav className="nav">
          <Link to="/">The Khutbah Audios</Link>
          <Link to="/biography">Biography</Link>
          <Link to="/developer">Developer</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

