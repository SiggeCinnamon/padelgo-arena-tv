import styles from "../ScoreBoard.module.scss";

export default function PlayerName({ teamName,nameColor }) {
  return (
    <>
      <div
        className={styles.playerName + " d-flex"}
        style={{
          backgroundColor: nameColor === 0 ? "#3D3D3D" : "#FFF",
          color: nameColor === 0 ? "#FFF" : "#3D3D3D",
        }}
      >
        <span>{teamName}</span>
      </div>
    </>
  );
}
