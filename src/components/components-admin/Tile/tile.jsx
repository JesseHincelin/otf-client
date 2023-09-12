import "./tile.scss";

const Tile = (props) => {
  const { content, handleTileClick } = props;

  const handleClick = () => {
    if (!handleTileClick) return;
    handleTileClick();
  };

  return (
    <div
      className="tile"
      onClick={handleClick}
    >
      <span className="tile__name">{content}</span>
    </div>
  );
};

export default Tile;
