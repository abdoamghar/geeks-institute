import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Header() {

    const {user, logout} = useAuth();

    async function handleLogout() {
  try {
    const response = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Could not log out');
    }

    logout();
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

    return (
        <header className="w-full border-b border-purple-100 bg-gradient-to-r from-violet-50 via-white to-purple-50 px-5 py-4 sm:px-8">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-purple-950">
                    <BookOpen size={27} strokeWidth={2.2} className="text-purple-700" aria-hidden="true" />
                    <span>Chapter<span className="text-purple-600">.</span></span>
                </Link>

                <nav aria-label="Main navigation" className="order-3 w-full md:order-none md:w-auto">
                    <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm font-medium text-slate-600">
                        <li><Link className="transition-colors hover:text-purple-700" to="/">The journal</Link></li>
                        <li><Link className="transition-colors hover:text-purple-700" to="/about">Design</Link></li>
                        <li><Link className="transition-colors hover:text-purple-700" to="/contact">Culture</Link></li>
                        <li><Link className="transition-colors hover:text-purple-700" to="/contact">Travel</Link></li>
                    </ul>
                </nav>

                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-purple-700">Welcome, {user.name}</span>
                        {user.role === 'admin' && (
                            <Link
                                to="/admin/articles/new"
                                className="rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                            >
                                New Article
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2">
                        Sign Up
                    </Link>
                )}
            </div>
        </header>
    );
}
export default Header