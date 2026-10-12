import { ArrowLeft, BookOpen, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFound() {
    return (
        <>
            <Header />
            <main className="flex min-h-[65vh] items-center justify-center bg-gradient-to-b from-violet-50 via-white to-white px-5 py-16 sm:px-8">
                <section className="w-full max-w-xl text-center">
                    <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-violet-100" />
                        <div className="absolute inset-3 rounded-full border border-violet-200 bg-white/70" />
                        <BookOpen
                            size={42}
                            strokeWidth={1.5}
                            className="relative text-violet-700"
                            aria-hidden="true"
                        />
                        <span className="absolute -right-1 top-2 rounded-full bg-purple-700 px-3 py-1 text-xs font-bold tracking-widest text-white shadow-sm">
                            404
                        </span>
                    </div>

                    <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                        Lost your place?
                    </p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        This page isn’t in our story.
                    </h1>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
                        The page may have moved, or the link might be out of date. Let’s help you find your way back.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            <Home size={16} aria-hidden="true" />
                            Back to the journal
                        </Link>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-800 transition-colors hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            <ArrowLeft size={16} aria-hidden="true" />
                            Go back
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default NotFound;