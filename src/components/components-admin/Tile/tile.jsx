import "./tile.scss";

const Tile = (props) => {
  const { content, handleTileClick } = props;

  const handleClick = () => {
    if (!handleTileClick) return;
    handleTileClick();
  };

  return (
    <button
      className="tile"
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default Tile;
