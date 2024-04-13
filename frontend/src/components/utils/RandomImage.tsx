import Image7 from "../../assets/landing/image7.jpeg";

const RandomImage = () => {
  return (
    <>
      <div>
        <div className="overflow-hidden flex items-center justify-center rounded h-[50vh]">
          <img src={Image7} alt="Random" className="rounded-lg" />
        </div>
        <p className="text-center text-sm mt-5 text-rooster-textSecondary">
          Moonlit Symphony in Sapphire
        </p>
      </div>
    </>
  );
};

export default RandomImage;
