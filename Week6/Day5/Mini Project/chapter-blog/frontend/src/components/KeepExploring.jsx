import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function KeepExploring({ children }) {
    return (
        <section className="w-full px-5 pb-12 pt-8 sm:px-8 sm:pb-16">
            <div className="mx-auto max-w-6xl border-t border-slate-100 pt-8">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700">
                            Keep exploring
                        </p>
                        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                            Your next good read.
                        </h2>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex shrink-0 items-center gap-2 pb-1 text-xs font-medium text-slate-700 transition-colors hover:text-violet-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    >
                        View all stories
                        <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default KeepExploring