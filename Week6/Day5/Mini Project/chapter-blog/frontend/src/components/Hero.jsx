function Hero() {
    return (
        <section className="w-full border-b border-slate-100 bg-white px-5 py-16 sm:py-20">
            <div className="mx-auto flex max-w-4xl flex-col items-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" aria-hidden="true" />
                    The Chapter Journal
                </span>
                <h1 className="!my-5 !text-4xl !font-bold !leading-tight !tracking-[-0.04em] text-slate-900 sm:!text-5xl">
                    A space for <span className="text-violet-600">curious minds.</span>
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
                    Fresh perspectives on design, culture, and the way we live.
                    <br className="hidden sm:block" /> Stories worth slowing down for.
                </p>
            </div>
        </section>
    )
}

export default Hero