import React, { useEffect } from "react";
import PoemViewHero from "./PoemViewHero";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOnePoem } from "../store/poems";
import PoemBody from "./PoemViewBody";

function PoemView() {
  const { poemId } = useParams();
  const dispatch = useDispatch();
  const poem = useSelector((state) => state.poem[poemId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getOnePoem(poemId));
  }, [dispatch, poemId]);

  return (
    <>
      <PoemViewHero poem={poem} />
      <PoemBody poem={poem} />
    </>
  );
}

export default PoemView;
