import { React, useState } from "react";
import "./card.css";

function Cards({ data }) {
  const color = ["#C1FFE3", "##F3F5F7", "#E7F5FB", "#FFE9F4", "#FFF4E0"];
  const random = Math.floor(Math.random() * color.length);

  const trimTitle = data.title.split(" ")[0];
  const sliceTitle = data.title.slice(0, 10);
  const sliceContent = data.content.slice(0, 40);
  const trimContent = data.content;

  return (
    <div
      id={data._id}
      style={{ backgroundColor: color[random] }}
      className="card"
    >
      <header>
        {trimTitle?.length > 10 ? `${sliceTitle}...` : `${trimTitle}`}{" "}
      </header>
      {trimContent.length > 40 ? (
        <div className="content">{`${sliceContent}. . .`}</div>
      ) : (
        <div className="content">{sliceContent} </div>
      )}
    </div>
  );
}

export default Cards;
