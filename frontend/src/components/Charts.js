import React from "react";
import "./stylesheets/Charts.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPoems } from "../store/poems";
import PoemChartTile from "./PoemChartTile";

function Charts() {
  const [numPoems, setNumPoems] = useState(10);
  const dispatch = useDispatch();
  const poems = useSelector((state) => {
    return state.poem.list.map((poemId) => state.poem[poemId]);
  });

  useEffect(() => {
    dispatch(getPoems());
  }, [dispatch]);

  return (
    <div id="charts" className="charts">
      <div className="charts-container">
        <div className="charts-grid">
          <div className="charts-header">
            <h2 className="charts-title">Charts</h2>
            <div className="charts-subtitle">
              <h3>Trending on Muse</h3>
            </div>
          </div>
          <div className="charts-poems">
            {poems.slice(0, numPoems).map((poem, i) => (
              <PoemChartTile key={poem.id} poem={poem} rank={i + 1} />
            ))}
          </div>
          <div className="charts-load-container">
            {poems.length > numPoems ? (
              <div
                className="charts-load"
                onClick={() => setNumPoems(numPoems + 10)}
              >
                Load More
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
