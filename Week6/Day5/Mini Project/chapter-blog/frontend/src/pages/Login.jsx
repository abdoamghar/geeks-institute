import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/auth', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            login(data.user);
            navigate('/');
        } else {
            setError(data.message);
        }
    };


    return (
        <>
        <Header />
        <main className="min-h-screen bg-white px-5 py-6 sm:px-8 lg:px-10">
            <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <section className="flex flex-col">
                    <Link
                        to="/"
                        className="mb-6 inline-flex w-fit items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-violet-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    >
                        <ArrowLeft size={14} aria-hidden="true" />
                        Back to the journal
                    </Link>

                    <div className="relative flex min-h-[420px] overflow-hidden rounded-2xl bg-slate-900 sm:min-h-[520px] lg:min-h-[min(80vh,680px)]">
                        <img
                            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=90"
                            alt="Shelves filled with books in a library"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/5" />
                        <div className="relative mt-auto max-w-lg p-7 text-white sm:p-10">
                            <BookOpen size={25} strokeWidth={1.8} aria-hidden="true" />
                            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                                A new perspective.
                                <br />
                                One story away.
                            </h1>
                            <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
                                Welcome to a community of curious readers and thoughtful storytellers. Your next chapter starts here.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-md py-4 lg:py-12">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                        Your chapter starts here
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        Welcome back.
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Sign in to your reader or editor account.
                    </p>

                    {error && <p className="mt-2 text-sm leading-6 text-red-500">{error}</p>}

                    <form onSubmit={handleLogin} className="mt-7 space-y-4">
                        <div>
                            <label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-xs font-medium text-slate-700">
                                Password
                            </label>
                            <div className="flex items-center rounded-lg border border-slate-200 bg-white pr-3 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className="min-w-0 flex-1 rounded-lg bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="rounded p-1 text-slate-400 transition-colors hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                                >
                                    {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            Sign in
                            <ArrowRight size={15} aria-hidden="true" />
                        </button>
                    </form>

                    <p className="mt-5 text-center text-[11px] text-slate-400">
                        Just here to read?{' '}
                        <Link to="/" className="underline decoration-slate-300 underline-offset-2 transition-colors hover:text-violet-700">
                            Explore without signing in.
                        </Link>
                    </p>
                </section>
            </div>
        </main>
        <Footer />
        </>
    );
}

export default Login;