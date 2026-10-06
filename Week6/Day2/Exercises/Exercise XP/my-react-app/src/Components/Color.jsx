import { useState, useEffect } from "react";

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached");
  }, []);

  const changeColor = () => {
    setFavoriteColor("blue");
  };

  return (
    <div>
      <h1>
        My Favorite Color is <i>{favoriteColor}</i>
      </h1>

      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default Color;