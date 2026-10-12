import { ArrowLeft, ArrowRight, Check, Image as ImageIcon, CirclePlus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

function NewArticle() {

    const { mutate } = useSWRConfig();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [story, setStory] = useState('');
    const [category, setCategory] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Please enter a title.';
        if (!author.trim()) newErrors.author = 'Please enter the author name.';
        if (!date) newErrors.date = 'Please choose a publication date.';
        if (!description.trim()) newErrors.description = 'Please enter a short description.';
        if (!story.trim()) newErrors.story = 'Please write the story.';
        if (!category) newErrors.category = 'Please choose a category.';
        if (!coverImage.trim()) newErrors.coverImage = 'Please enter a cover image URL.';
        if (!imageAlt.trim()) newErrors.imageAlt = 'Please describe the cover image.';

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const newArticle = {
            id: 1,
            title: title.trim(),
            excerpt: description.trim(),
            chapter: story.trim(),
            category: category,
            image: coverImage.trim(),
            imageAlt: imageAlt.trim(),
            author: author.trim(),
            date: date
        };

        setIsSaving(true);

        fetch('http://localhost:3000/api/articles', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArticle)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to create article.');
            }
            return response.json();
        })
        .then(async () => {
            // Re-fetch the shared list so the new article appears in the journal.
            await mutate('http://localhost:3000/api/articles');
            setShowSuccess(true);
            setTitle('');
            setDescription('');
            setStory('');
            setCategory('');
            setCoverImage('');
            setImageAlt('');
            setAuthor('');
            setDate('');
        })
        .catch((error) => {
            console.error('Error creating article:', error);
            newErrors.submit = 'Failed to create article. Please try again.';
            setErrors(newErrors);
        }).finally(() => {
            setIsSaving(false);
        });  
    }

    return (
        <>
        <Header />
        <main className="min-h-screen bg-white px-5 py-6 sm:px-8 sm:py-8">
            <div className="mx-auto max-w-3xl">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-violet-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                    <ArrowLeft size={14} aria-hidden="true" />
                    Back to journal
                </Link>

                <header className="mb-7 mt-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                        The editor’s desk
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Create a new story.
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        A fresh idea, a thoughtful image, and your point of view.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="article-title" className="mb-2 block text-xs font-semibold text-slate-700">
                            Article title
                        </label>
                        <input
                            maxLength={250}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="article-title"
                            type="text"
                            placeholder="Give your story a clear, engaging title"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                        {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="article-author" className="mb-2 block text-xs font-semibold text-slate-700">
                                Author
                            </label>
                            <input
                                maxLength={50}
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                id="article-author"
                                type="text"
                                autoComplete="name"
                                placeholder="Author name"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                            />
                            {errors.author && <p className="mt-1 text-xs text-rose-600">{errors.author}</p>}
                        </div>

                        <div>
                            <label htmlFor="article-date" className="mb-2 block text-xs font-semibold text-slate-700">
                                Publication date
                            </label>
                            <input
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                id="article-date"
                                type="date"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                            />
                            {errors.date && <p className="mt-1 text-xs text-rose-600">{errors.date}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="article-description" className="mb-2 block text-xs font-semibold text-slate-700">
                            Short description
                        </label>
                        <textarea
                            maxLength={300}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="article-description"
                            rows="3"
                            placeholder="Summarize your story in a sentence or two"
                            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                        {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
                        <p className="mt-1.5 text-[10px] text-slate-400">
                            Appears on the article card.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="article-story" className="mb-2 block text-xs font-semibold text-slate-700">
                            Your story
                        </label>
                        <textarea
                            maxLength={800}
                            value={story}
                            id="article-story"
                            rows="12"
                            placeholder="Write your story here. Add a blank line between paragraphs."
                            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                            onChange={(e) => setStory(e.target.value)}
                        />
                        {errors.story && <p className="mt-1 text-xs text-rose-600">{errors.story}</p>}
                        <p className="mt-1.5 text-[10px] leading-5 text-slate-400">
                            Plain text only. Add a blank line between paragraphs. HTML is displayed as text.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                        <button
                            disabled={isSaving}
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            <CirclePlus size={14} aria-hidden="true" />
                            {isSaving ? 'Saving...' : 'Add to journal'}
                        </button>
                        <Link
                            to="/"
                            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            Cancel
                        </Link>
                    </div>
                <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                    <div className="mb-5">
                        <h2 className="text-sm font-semibold text-slate-900">The finishing touches</h2>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Choose a category and give your story a cover image.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label htmlFor="article-category" className="mb-2 block text-xs font-semibold text-slate-700">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                id="article-category"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                            >
                                <option value="" disabled>Select a category</option>
                                <option>Culture</option>
                                <option>Design</option>
                                <option>Development</option>
                                <option>Product</option>
                                <option>Travel</option>
                            </select>
                            {errors.category && <p className="mt-1 text-xs text-rose-600">{errors.category}</p>}
                        </div>

                        <div>
                            <label htmlFor="cover-image" className="mb-2 block text-xs font-semibold text-slate-700">
                                Cover image URL
                            </label>
                            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
                                <ImageIcon size={15} className="shrink-0 text-slate-400" aria-hidden="true" />
                                <input
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    id="cover-image"
                                    type="url"
                                    placeholder="https://example.com/your-image.jpg"
                                    className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                                />
                            </div>
                            {errors.coverImage && <p className="mt-1 text-xs text-rose-600">{errors.coverImage}</p>}
                            <p className="mt-1.5 text-[10px] leading-5 text-slate-400">
                                Use a direct HTTPS image link you have permission to use. No upload needed.
                            </p>
                        </div>

                        <div>
                            <label htmlFor="cover-image-alt" className="mb-2 block text-xs font-semibold text-slate-700">
                                Image description (alt text)
                            </label>
                            <input
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                                id="cover-image-alt"
                                type="text"
                                placeholder="Describe the image for readers using screen readers"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                            />
                            {errors.imageAlt && <p className="mt-1 text-xs text-rose-600">{errors.imageAlt}</p>}
                            <p className="mt-1.5 text-[10px] leading-5 text-slate-400">
                                Briefly describe what the cover image shows.
                            </p>
                        </div>

                        <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-400">
                            <div className="flex flex-col items-center gap-2">
                                <ImageIcon size={24} strokeWidth={1.5} aria-hidden="true" />
                                <span className="text-xs">Image preview</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 border-t border-slate-200 pt-4">
                        <p className="text-xs font-semibold text-slate-800">A little editorial advice</p>
                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                            Keep the title clear, choose an inviting image, and give your paragraphs room to breathe.
                        </p>
                    </div>
                </section>
                </form>
                {errors.submit && <p className="mt-4 text-sm text-rose-600">{errors.submit}</p>}

                <div className="mt-6 flex justify-end">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-violet-700"
                    >
                        Return to journal
                        <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </main>
        <Footer />
        {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-5 py-8">
                <section
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="article-success-title"
                    className="relative w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8"
                >
                    <button
                        type="button"
                        onClick={() => setShowSuccess(false)}
                        aria-label="Close success message"
                        className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <Check size={24} aria-hidden="true" />
                    </span>
                    <h2 id="article-success-title" className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                        Article added!
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Your new story has been added to the journal.
                    </p>
                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => setShowSuccess(false)}
                            className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            Create another
                        </button>
                        <Link
                            to="/"
                            className="rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            Back to journal
                        </Link>
                    </div>
                </section>
            </div>
        )}
        </>
    );
}

export default NewArticle;