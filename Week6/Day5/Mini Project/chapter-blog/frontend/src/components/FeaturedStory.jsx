import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function FeaturedStory() {
    return (
        <section className="w-full px-5 py-8 sm:px-8 sm:py-12">
            <article className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/70 shadow-sm md:grid-cols-2">
                <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85"
                    alt="Laptop displaying code on a bright workspace"
                    className="h-64 w-full object-cover sm:h-80 md:h-full md:min-h-[340px]"
                />

                <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 md:px-12">
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-violet-700">
                        <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">Editor's pick</span>
                        <span className="h-1 w-1 rounded-full bg-violet-400" aria-hidden="true" />
                        <span>Development</span>
                    </div>

                    <h2 className="m-0 max-w-lg text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                        Learning by building, one chapter at a time
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                        A simple guide to exploring this classroom journal, from signing in as a reader to publishing your first article as an admin.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-xs font-semibold text-amber-900" aria-hidden="true">
                            OB
                        </span>
                        <div className="text-xs">
                            <p className="font-semibold text-slate-800">Olivia Bennett</p>
                            <p className="mt-1 text-slate-500">Oct 9, 2026 <span className="mx-1">·</span> Featured story</p>
                        </div>
                    </div>

                    <Link
                        to="/articles"
                        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-violet-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    >
                        Read the story
                        <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                </div>
            </article>
        </section>
    );
}

export default FeaturedStory;