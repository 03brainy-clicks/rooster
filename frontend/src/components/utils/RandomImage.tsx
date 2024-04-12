import { useState, useEffect } from "react";
import {
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
} from "../../assets/landing";

const RandomImage = () => {
  const images = [
    {
      image: Image1,
      description: "Icy Peaks at Midnight",
    },
    {
      image: Image2,
      description: "Umbrella Symphony in Azure",
    },
    {
      image: Image3,
      description: "Cruise's Window to the Sea",
    },
    {
      image: Image4,
      description: "Man's Shadow Dance",
    },
    {
      image: Image5,
      description: "Glowing Jellyfish Ballet",
    },
    {
      image: Image6,
      description: "Sunlight Serenade in a Room",
    },
    {
      image: Image7,
      description: "Moonlit Symphony in Sapphire",
    },
  ];

  // State to store the selected random image
  const [randomImage, setRandomImage] = useState({});

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomNumber]);
  }, []);

  return (
    <>
      {randomImage && (
        <div>
          <div className="overflow-hidden flex items-center justify-center rounded">
            <img src={randomImage?.image} alt="Random" className="rounded-lg" />
          </div>
          <p className="text-center text-sm mt-5 text-rooster-textSecondary">
            {randomImage?.description}
          </p>
        </div>
      )}
    </>
  );
};

export default RandomImage;
