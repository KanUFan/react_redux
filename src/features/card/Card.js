import React, { useState } from "react";
import LikeSVG from "../../like.svg";
import DeleteSVG from "../../delete.svg";

function Delete(event) {
    event.currentTarget.parentNode.parentNode.parentNode.remove();
}

export default function Card(props) {
    const [isLiked, setIsLiked] = useState(false);

    const Like = (event) => {
        setIsLiked((current) => !current);

        event.currentTarget.style.backgroundColor =
            event.currentTarget.style.backgroundColor === "rgb(255, 102, 127)"
                ? ""
                : "rgb(255, 102, 127)";
    };

    return (
        <div className="card" data-liked={isLiked}>
            <div className="card__top">
                <div className="card__image">
                    <img src={props.imageURL} alt="dog" />
                </div>
            </div>
            <div className="card__bottom">
                <p className="card__text">{props.text}</p>
                <div className="card__buttons">
                    <img
                        src={LikeSVG}
                        alt="Like svg"
                        onClick={Like}
                        className="card__buttonSVG"
                        id="LikeButtonSVG"
                    />
                    <img
                        src={DeleteSVG}
                        alt="Delete svg"
                        onClick={Delete}
                        className="card__buttonSVG"
                        id="DeleteButtonSVG"
                    />
                </div>
            </div>
        </div>
    );
}
