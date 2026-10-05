function UserFavoriteAnimals({favAnimals}) {
    return (
        <>
        <ul>
            {favAnimals.map((animal, index) => (
                <li key={index}>{animal}</li>
            ))}
        </ul>
        </>
    )
}

export default UserFavoriteAnimals;