function CelebrityCard({ celebrity }) {
    return (
        <>
        <div className="max-w-md bg-white shadow rounded p-4">
            <img src={celebrity.imageUrl} alt={celebrity.title} className="rounded mb-3" />

            <h2 className="text-xl font-bold mb-2">
                {celebrity.title}
            </h2>

            <p className="text-gray-600 mb-3">
                {celebrity.description}
            </p>

            <a href={celebrity.buttonUrl} className="bg-blue-500 text-white px-4 py-2 rounded">
                {celebrity.buttonLabel}
            </a>
        </div>
        </>
    )
}

export default CelebrityCard