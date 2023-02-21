import { useEffect, useState, useRef } from "react";
import { db, auth } from "../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [newMoviesTitle, setNewMoviesTitle] = useState("");
  const [newMoviesRealese, setNewMoviesRealese] = useState("");
  const [newMoviesOscar, setNewMoviesOscar] = useState(false);
  const [updateTitleMovie, setUpdateTitleMovie] = useState("");

  const newtitleRef = useRef("");
  const newDateRef = useRef("");
  const oscarRef = useRef("");
  const updateTitle = useRef("");

  const moviesCollectionRef = collection(db, "movies");

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMoviesTitle,
        realeseDate: newMoviesRealese,
        oscar: newMoviesOscar,
        userId: auth?.currentUser?.uid,
      });
      getListMovies();
      newtitleRef.current.value = "";
      newDateRef.current.value = "";
      setNewMoviesOscar(false);
      console.log(oscarRef.current.checked);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const docMovie = doc(db, "movies", id);
      await deleteDoc(docMovie);
      getListMovies();
    } catch (error) {
      console.error(error);
    }
  };

  const updateMovie = async (id) => {
    try {
      const docMovie = doc(db, "movies", id);
      await updateDoc(docMovie, { title: updateTitleMovie });
      getListMovies();
      updateTitle.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const getListMovies = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filtredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filtredData);
      setMoviesList(filtredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListMovies();
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <input
            ref={newtitleRef}
            className="form-control input"
            id="movies"
            type="text"
            placeholder="Movies Title..."
            onChange={() => {
              setNewMoviesTitle(newtitleRef.current.value);
            }}
          />
        </div>
        <div>
          <input
            ref={newDateRef}
            className="form-control input"
            id="date"
            type="number"
            placeholder="Realese Date..."
            onChange={() => {
              setNewMoviesRealese(+newDateRef.current.value);
            }}
          />
        </div>

        <div className="checkbox-container">
          <input
            ref={oscarRef}
            type="checkbox"
            id="checkbox"
            className="checkbox"
            checked={newMoviesOscar === true}
            onChange={() => {
              setNewMoviesOscar(oscarRef.current.checked);
            }}
          />
          <label htmlFor="checkbox" className="label-checkbox">
            recevied oscar
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary btn-submit"
            onClick={onSubmitMovie}
          >
            Submit Movie
          </button>
        </div>
      </div>
      <h1>Movies</h1>
      <ul>
        {moviesList.map((mov, i) => (
          <li key={i} className="list">
            <h1>{mov.title}</h1>
            <p>{mov.oscar && "with oscar"}</p>
            <p>{mov.realeseDate}</p>

            <div className="update-title">
              <input
                ref={updateTitle}
                className="form-control input update-input"
                type="text"
                placeholder="Update title..."
                onChange={() => {
                  setUpdateTitleMovie(updateTitle.current.value);
                }}
              />
              <button
                onClick={() => {
                  updateMovie(mov.id);
                }}
                type="button"
                className="btn btn-info"
              >
                Update
              </button>
            </div>

            <button
              onClick={() => {
                deleteMovie(mov.id);
              }}
              type="button"
              className="btn btn-danger"
            >
              Delete Movie
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
