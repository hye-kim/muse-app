import React, { useEffect } from "react";
import PoemViewHero from "./PoemViewHero";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOnePoem } from "../store/poems";
import PoemViewBody from "./PoemViewBody";

function PoemView() {
  const { poemId } = useParams();
  const dispatch = useDispatch();
  const poem = useSelector((state) => state.poem[poemId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getOnePoem(poemId));
  }, [dispatch, poemId]);

  document.title = `${poem?.Poet.name} - ${poem?.title} Lyrics`

  return (
    <>
      <PoemViewHero poem={poem} />
      <PoemViewBody poem={poem} />
    </>
  );
}

export default PoemView;
