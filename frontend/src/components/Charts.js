import React from "react";
import "./stylesheets/Charts.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPoems } from "../store/poems";
import PoemTile from "./PoemTile"

function Charts() {
  const [numPoems, setNumPoems] = useState(10);
  const dispatch = useDispatch();
  const poems = useSelector((state) => Object.values(state.poem));

  useEffect(() => {
      dispatch(getPoems())
  }, [dispatch])

  return (
    <div className="charts-container">
      <div className="charts-grid">
        <div className="charts-header">
          <h2 className="charts-title">Charts</h2>
          <div className="charts-subtitle">
            <h3>Trending on Muse</h3>
          </div>
        </div>
        <div className="charts-poems">
            {poems.slice(0, numPoems).map(poem => (
                <PoemTile key={poem.id} poem={poem} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Charts;
