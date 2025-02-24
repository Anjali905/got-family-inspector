import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CharacterDetail.module.scss";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allCharacters} = useSelector(
    (state) => state.characters
  );

  const selectedCharacter = allCharacters.find((char) => char.id.toString() === id);

  if (!selectedCharacter) {
    return(
       <>
       <p className={styles.errorMessage}>Character not found.</p>
       <button className={styles.backButton} onClick={() => navigate(-1)}>
       ⬅ Go Back
     </button>
       </>
    
    ) 
  }

  // Filter house members (excluding selected character)
  const houseMembers = allCharacters.filter(
    (char) => char.family === selectedCharacter.family && char.id.toString() !== id
  );

  // Navigate to selected house member's details
  const handleCharacterClick = (charId) => {
    navigate(`/character/${charId}`);
  };

  return (
    <div className={styles.detailContainer}>
    
      {/* Character Details */}
      <div className={styles.characterInfo}>
        <img
          src={selectedCharacter.imageUrl}
          alt={selectedCharacter.fullName}
          className={styles.characterImage}
          loading="lazy"
        />
        <div className={styles.textDetails}>
          <h1>{selectedCharacter.fullName}</h1>
          <p><strong>First Name:</strong> {selectedCharacter.firstName}</p>
          <p><strong>Last Name:</strong> {selectedCharacter.lastName}</p>
          <p><strong>Title:</strong> {selectedCharacter.title}</p>
          <p><strong>Family:</strong> {selectedCharacter.family}</p>
        </div>
      </div>

      {/* House Members Horizontal Scrollable Container */}
      {houseMembers.length > 0 && (
        <div className={styles.houseMembersContainer}>
          <h4>Family - {selectedCharacter.family}</h4>
          <div className={styles.horizontalScroll}>
            {houseMembers.map((member) => (
              <div
                key={member.id}
                className={styles.houseMemberCard}
                onClick={() => handleCharacterClick(member.id)}
              >
                <img
                  src={member.imageUrl}
                  alt={member.fullName}
                  className={styles.houseMemberImage}
                  loading="lazy"
                />
               
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
