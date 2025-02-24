import React from "react";
import styles from "./mainList.module.scss";

const CharacterCard = React.memo(({ character, onClick }) => {
  return (
    <div key={character.id} className={styles.characterCard} onClick={onClick}>
      <img
        src={character.imageUrl}
        alt={character.fullName}
        className={styles.characterImage}
        loading="lazy"
      />
      <div className={styles.viewButton}>View</div>
    </div>
  );
});

export default CharacterCard;
