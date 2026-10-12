import { Search } from 'lucide-react';
import StoryCard from './StoryCard';
import { useState } from 'react';
import useSWR from 'swr';

// SWR calls this function to request data 
async function fetcher(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch articles.');
    }

    return response.json();
}
/// end

function StoryList() {

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // SWR fetches and caches the article list, and provides its loading and error states.
    const {
        data: articleData,
        error,
        isLoading,
    } = useSWR('http://localhost:3000/api/articles', fetcher);

    const visibleStories = articleData?.filter((story) => {
        const matchesCategory =
            selectedCategory === 'All' || story.category === selectedCategory;
        const matchesSearch =
            story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    }) || [];

    return (
        <section className="w-full px-5 py-10 sm:px-8 sm:py-12">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700">
                            The latest
                        </p>
                        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                            Good stories. New perspectives.
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            A little inspiration for your next chapter.
                        </p>
                    </div>

                    <label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-400 transition-colors focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100 sm:w-48">
                        <Search size={16} aria-hidden="true" />
                        <input
                            type="search"
                            placeholder="Find a story..."
                            aria-label="Find a story"
                            className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </label>
                </div>

                <nav aria-label="Filter stories by topic" className="mt-6 border-b border-slate-100">
                    <ul className="flex gap-6 overflow-x-auto">
                        {[ 'All', 'Design', 'Product', 'Development', 'Culture', 'Travel'].map((category) => (
                            <li key={category}>
                                <button onClick={() => setSelectedCategory(category)} type="button" className={`whitespace-nowrap border-b-2 ${selectedCategory === category ? 'border-violet-600 text-violet-700' : 'border-transparent'} pb-3 text-xs font-medium text-slate-500 transition-colors hover:border-violet-200 hover:text-violet-700`}>
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {isLoading ? (
                    <p className="mt-6 text-sm text-slate-500">Loading stories...</p>
                ) : error ? (
                    <p role="alert" className="mt-6 text-sm text-rose-600">{error.message}</p>
                ) : (
                    <>
                        <p className="pt-3 text-xs text-slate-400">{visibleStories.length} stories</p>
                
                        {visibleStories.length === 0 ? (
                            <p className="mt-4 text-sm text-slate-500">
                                No stories match your search or selected category.
                            </p>
                        ) : (
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                                {visibleStories.map((story) => (
                                    <StoryCard key={story.id} story={story} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default StoryList;