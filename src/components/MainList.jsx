import styles from "./mainList.module.scss";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharactersRequest } from "../redux/slices/characterSlice";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../redux/slices/filterSlice";
import CharacterCard from "./CharacterCard";

const MainList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCharacters, houses, loading, error } = useSelector(
    (state) => state.characters
  );
  const selectedHouse = useSelector((state) => state.filter.selectedHouse);

  useEffect(() => {
    dispatch(fetchCharactersRequest());
  }, [dispatch]);
  const filteredCharacters = useMemo(() => {
    if (!allCharacters || allCharacters.length === 0) return []; // Prevent filtering empty state
    return selectedHouse === "All"
      ? allCharacters
      : allCharacters.filter((char) => char.family === selectedHouse);
  }, [allCharacters, selectedHouse]);
  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };
  const handleCharacterClick = useCallback(
    (characterId) => {
      navigate(`/character/${characterId}`);
    },
    [navigate]
  );
  if (loading) return <p className={styles.fadeIn}>Loading characters...</p>;
  if (error)
    return <p className={styles.fadeIn}>Error fetching characters: {error}</p>;

  return (
    <>
      <h1 className={styles.title}>Game of Thrones Families</h1>
      <div className={styles.filterContainer}>
        <label htmlFor="houseFilter" className={styles.filterLabel}>
          Select Family :
        </label>
        <select
          id="houseFilter"
          className={styles.dropdown}
          value={selectedHouse}
          onChange={handleFilterChange}
        >
          <option value="All">All Characters</option>
          {houses.map((house, index) => (
            <option key={index} value={house}>
              {house}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.characterListContainer}>
        {filteredCharacters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => handleCharacterClick(character.id)}
          />
        ))}
      </div>
    </>
  );
};

export default MainList;
