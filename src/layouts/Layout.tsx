import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout-container">
      <header className="header"></header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
