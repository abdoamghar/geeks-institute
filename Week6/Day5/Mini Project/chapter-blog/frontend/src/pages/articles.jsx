import { ArrowLeft, Clock3, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import KeepExploring from '../components/KeepExploring';
import StoryCard from '../components/StoryCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import useSWR, { useSWRConfig } from 'swr';

// SWR uses this function to fetch the article list 
async function fetcher(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch articles.');
    }

    return response.json();
}
/// end

function Articles() {
    const { id } = useParams();

    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const { mutate } = useSWRConfig();

    const [showSuccess, setShowSuccess] = useState(false);
    // Use the same key as StoryList so both pages share the cached article list.
    const {
        data: allArticles,
        error,
        isLoading,
    } = useSWR('http://localhost:3000/api/articles', fetcher);

    // Find the selected article in the shared list; route IDs are strings.
    const articleData = allArticles?.find((story) => String(story.id) === id);


    async function deleteArticle(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete article.');
            }

            // Re-fetch the shared list so the deleted article is removed from SWR's cache.
            await mutate('http://localhost:3000/api/articles');
            setShowSuccess(true);
        } catch (error) {
            setShowSuccess(false);
            console.error('Error deleting article:', error);
        }
    }

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
                <p className="rounded-xl border border-violet-100 bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
                    Loading article...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
                <p role="alert" className="max-w-lg rounded-xl border border-rose-200 bg-white px-6 py-4 text-center text-sm font-medium leading-6 text-rose-700 shadow-sm">
                    {error.message}
                </p>
            </main>
        );
    }

    if (showSuccess) {
        return (
            <>
                <Header />
                <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-12">
                    <section
                        role="status"
                        className="w-full max-w-md rounded-2xl border border-violet-100 bg-white p-8 text-center shadow-sm"
                    >
                        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check size={24} aria-hidden="true" />
                        </span>
                        <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                            Article Deleted!
                        </h1>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Your article has been successfully deleted.
                        </p>
                        <Link
                            to="/"
                            className="mt-6 inline-flex rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            Back to journal
                        </Link>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    if (!articleData) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
                <p role="alert" className="max-w-lg rounded-xl border border-rose-200 bg-white px-6 py-4 text-center text-sm font-medium leading-6 text-rose-700 shadow-sm">
                    Article not found.
                </p>
            </main>
        );
    }

    return (
        <>
        <Header />
        <main className="min-h-screen bg-white px-5 pb-12 text-left sm:px-8 sm:pb-16">
            <div className="mx-auto max-w-6xl">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 py-4 text-xs font-medium text-slate-500 transition-colors hover:text-violet-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                    <ArrowLeft size={15} aria-hidden="true" />
                    All stories
                </Link>

                <header className="mx-auto flex max-w-2xl flex-col items-center pb-8 pt-7 text-center sm:pt-9">
                    <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-violet-700">
                        {articleData.category}
                    </span>
                    <h1 className="!my-4 !text-3xl !font-bold !leading-tight !tracking-[-0.04em] !text-slate-900 sm:!text-4xl">
                        {articleData.title}
                    </h1>
                    <p className="max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
                        {articleData.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">{articleData.author}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime="2026-10-07">{articleData.date}</time>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock3 size={13} aria-hidden="true" />
                            2 min read
                        </span>
                    </div>
                    {isAdmin && (
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] text-slate-500">
                            <Link to={`/admin/articles/${articleData.id}/edit`}  className="rounded-lg border border-violet-200 bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700 transition-colors hover:bg-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
                                Edit Article
                            </Link>
                            <button onClick={() => deleteArticle(articleData.id)} className="rounded-lg border border-rose-200 bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2">
                                Delete Article
                            </button>
                    </div>
                    )}
                </header>

                <figure className="overflow-hidden rounded-xl">
                    <img
                        src={articleData.image}
                        alt={articleData.imageAlt}
                        className="h-64 w-full object-cover sm:h-80 md:h-[400px]"
                    />
                </figure>

                <article className="mx-auto max-w-2xl">
                    <p className="mb-5 mt-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700">
                        A chapter worth reading
                    </p>
                    <p className="text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
                        {articleData.chapter}
                    </p>

                    <footer className="mt-8 flex items-center gap-3 border-y border-slate-100 py-6">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-xs font-semibold text-amber-900" aria-hidden="true">
                            {articleData.author.split(' ').map((name) => name[0]).join('')}
                        </span>
                        <div>
                            <p className="text-[10px] uppercase tracking-wide text-slate-400">Written by</p>
                            <p className="mt-1 text-xs font-semibold text-slate-800">{articleData.author}</p>
                            <p className="mt-1 text-xs text-slate-500">Sharing ideas, one chapter at a time.</p>
                        </div>
                    </footer>
                </article>
                <KeepExploring>
                    {allArticles?.filter((story) => story.id !== articleData.id).map((story) => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </KeepExploring>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Articles
