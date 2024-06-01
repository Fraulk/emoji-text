import { useState } from "react";
import "./App.css";

import { letters } from "./letters";

type Letter = keyof typeof letters;

const App = () => {
    const [text, setText] = useState("hello");
    const [emojis, setEmojis] = useState(["⬛", "🌸"]);

    const splittedText = text.split("");

    // https://discord.com/channels/549986543650078722/549986543650078725/1246131082676535347

    const filterText = (e: any) => {
        const value = e.target.value;
        if (value.match(/[^a-zA-Z ]/)) return;
        setText(value.toLowerCase());
    }

    const filterEmoji = (e: any) => {
        const value = e.target.value;
        if (value.match(/[^^\p{Emoji}]/u)) return;
        // if (value.length > 1) return;
        setEmojis((emojis) => {
            const newEmojis = [...emojis];
            newEmojis[parseInt(e.target.name)] = value;
            return newEmojis;
        });
    }

    return (
        <>
            <div>
                <div className="emojified-text">
                    {/* 5 is the letter height */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i}>
                            {splittedText.map((lett: any, j) => {
                                // 4 is the letter width
                                let letter = lett;
                                if (letter == " ") letter = "space";
                                return [...Array(4)].map((_, k) => (
                                    <span key={k}>
                                        {emojis[letters[letter as Letter][i][k]]}
                                        {k == 3 && j < splittedText.length - 1 ? emojis[0] : null}
                                    </span>
                                ));
                            })}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    maxLength={8}
                    value={text}
                    onChange={filterText}
                />
                <input
                    type="text"
                    name="0"
                    value={emojis[0]}
                    onChange={filterEmoji}
                />
                <input
                    type="text"
                    name="1"
                    value={emojis[1]}
                    onChange={filterEmoji}
                />
            </div>
        </>
    );
};

export default App;
