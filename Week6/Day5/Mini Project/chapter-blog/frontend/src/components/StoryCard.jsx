import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function StoryCard({ story }) {
    return (
        <article className="group min-w-0">
            <Link
                to={`/articles/${story.id}`}
                className="group block min-w-0 focus-visible:rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
                <div className="overflow-hidden rounded-xl">
                    <div className="relative aspect-[1.45/1] overflow-hidden bg-violet-100">
                        <img
                            src={story.image}
                            alt={story.imageAlt ?? ''}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-slate-950/75 via-slate-900/35 to-transparent px-4 pb-4 pt-12 text-white">
                            <div className="text-xs">
                                <p className="font-semibold">{story.author}</p>
                                <p className="mt-1 text-white/80">{story.date}</p>
                            </div>
                            <span className="text-xs font-medium">{story.category}</span>
                        </div>
                    </div>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-violet-700">
                    {story.title}
                    <ArrowUpRight size={16} className="ml-1 inline-block align-[-2px]" aria-hidden="true" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{story.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet-700 transition-colors group-hover:text-violet-900">
                    Read story
                    <ArrowUpRight size={14} aria-hidden="true" />
                </span>
            </Link>
        </article>
    );
}

export default StoryCard;