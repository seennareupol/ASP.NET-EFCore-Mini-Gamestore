import { Outlet } from 'react-router-dom';
import NavMenu from './components/NavMenu';

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavMenu />
            <main className="container flex-grow-1 py-4">
                <Outlet />
            </main>
            <footer className="mt-auto py-4 border-top" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="container d-flex justify-content-between align-items-center text-muted small">
                    <div>
                        &copy; 2026 Game Store. All rights reserved.
                    </div>
                    <div>
                        <span className="me-3 cursor-pointer hover-text-white">Privacy</span>
                        <span className="me-3 cursor-pointer hover-text-white">Terms</span>
                        <span className="cursor-pointer hover-text-white">Contact</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;