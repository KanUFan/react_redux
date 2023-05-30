import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./app/store";
import { cardAdded } from "./features/card/cardSlice";
import Card from "./features/card/Card";
import LikeSVG from "./like.svg";
import "./index.css";

function Filter() {
    const [isActive, setIsActive] = useState(false);

    const LikeFilter = (event) => {
        console.log(isActive);
        setIsActive((current) => !current);
        console.log(isActive);

        let unliked = document.querySelectorAll('[data-liked="false"]');
        if (!isActive) {
            unliked.forEach((tag) => {
                tag.style.display = "none";
            });
        } else {
            unliked.forEach((tag) => {
                tag.style.display = "";
            });
        }

        event.currentTarget.style.backgroundColor =
            event.currentTarget.style.backgroundColor === "rgb(255, 102, 127)"
                ? ""
                : "rgb(255, 102, 127)";
    };

    return (
        <div id="likeFilter">
            <img
                src={LikeSVG}
                alt="Like svg"
                onClick={LikeFilter}
                id="likeFilterSVG"
                data-active={isActive}
            />
        </div>
    );
}

function Deck() {
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.card);

    async function fetchData() {
        const textApi =
            "https://quote-garden.onrender.com/api/v3/quotes/random?count=7";
        const imageApi = "https://dog.ceo/api/breeds/image/random/7";

        const [texts, imagesURL] = await Promise.all([
            fetch(textApi).then((response) => response.json()),
            fetch(imageApi).then((response) => response.json()),
        ]);

        texts.data.forEach((el, i) => {
            dispatch(
                cardAdded({
                    text: el.quoteText,
                    imageURL: imagesURL.message[i],
                })
            );
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderedCards = cards.map((card) => (
        <Card text={card.text} imageURL={card.imageURL}></Card>
    ));

    renderedCards.shift();

    return (
        <>
            <Filter></Filter>
            <div id="cards">{renderedCards}</div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Deck />
    </Provider>
);
