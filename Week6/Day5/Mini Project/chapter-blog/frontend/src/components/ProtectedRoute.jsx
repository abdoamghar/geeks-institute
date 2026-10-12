import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function ProtectedRoute({ children }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== 'admin') {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
                <section className="w-full max-w-md rounded-2xl border border-violet-100 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                        <LockKeyhole size={25} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                        Admin access required
                    </p>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                        You can’t access this page
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Your account doesn’t have permission to manage articles.
                    </p>
                    <Link
                        to="/"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    >
                        <ArrowLeft size={14} aria-hidden="true" />
                        Back to the journal
                    </Link>
                </section>
            </main>
        );
    }

    return children;
}

export default ProtectedRoute;