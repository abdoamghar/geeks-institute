import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-100 bg-white px-5 text-left sm:px-8">
      <div className="mx-auto max-w-6xl py-10 sm:py-12">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-violet-50 px-6 py-7 sm:flex-row sm:items-center sm:px-10 sm:py-8">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-purple-600 shadow-sm">
              <BookOpen size={19} aria-hidden="true" />
            </span>
            <div>
              <h2 className="m-0 text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl">
                Every great idea starts with a little curiosity.
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Pick a topic. Follow a thought. Find your next perspective.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          >
            Explore culture
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto grid max-w-6xl gap-9 py-9 sm:grid-cols-2 sm:gap-12 sm:py-10 md:grid-cols-[1fr_auto_auto]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                <BookOpen size={17} aria-hidden="true" />
              </span>
              <span>chapter<span className="text-violet-600">.</span></span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              A place for fresh ideas, thoughtful stories, and a little everyday inspiration.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link className="transition-colors hover:text-violet-700" to="/">All stories</Link></li>
              <li><Link className="transition-colors hover:text-violet-700" to="/about">Design &amp; creativity</Link></li>
              <li><Link className="transition-colors hover:text-violet-700" to="/contact">Places &amp; perspectives</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Your chapter</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link className="transition-colors hover:text-violet-700" to="/signup">Reader &amp; editor access</Link></li>
              <li><Link className="inline-flex items-center gap-1 transition-colors hover:text-violet-700" to="/about">Built to learn <ArrowRight size={13} aria-hidden="true" /></Link></li>
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-slate-100 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Chapter. A classroom journal.</p>
          <p>Made for curious minds. Built with React.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;