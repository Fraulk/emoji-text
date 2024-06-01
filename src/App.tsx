import { useState } from "react";
import "./App.scss";
import DiscordDefaultAvatar from "./assets/discord-default-avatar.png";

import { letters } from "./letters";

type Letter = keyof typeof letters;

const App = () => {
    const [text, setText] = useState("hello");
    const [emojis, setEmojis] = useState(["⬛", "🌸"]);
    const [hasCopied, setHasCopied] = useState(false)

    const splittedText = text.split("");
    const dateStringOptions: any = {
        weekday: undefined,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

    // https://discord.com/channels/549986543650078722/549986543650078725/1246131082676535347

    const filterText = (e: any) => {
        const value = e.target.value;
        if (value.match(/[^a-zA-Z ]/)) return;
        setText(value.toLowerCase());
    };

    const filterEmoji = (e: any) => {
        const value = e.target.value;
        // too much emojis that doesn't pass the regex...
        // if (value.match(/[^^\p{Emoji}]/u) && value != "❤️") return;
        setEmojis((emojis) => {
            const newEmojis = [...emojis];
            newEmojis[+e.target.name] = value;
            return newEmojis;
        });
    };

    const copyToClipboard = () => {
        if (hasCopied) return;
        setHasCopied(true)
        const copyText = document.querySelector(".action-help") as HTMLElement
        copyText.innerText = ""
        const range = document.createRange();
        range.selectNode(document.querySelector(".emojified-text")!);
        window.getSelection()?.addRange(range);
        document.execCommand("copy");
        window.getSelection()?.removeAllRanges();
        copyText.innerText = "Copy"
        setTimeout(() => {
            setHasCopied(false)
        }, 2500)
    }

    return (
        <div className="app">
            <div className="date-separator">{new Date().toLocaleDateString(undefined, dateStringOptions)}</div>
            <div className="gvp__guesses__item">
                <img src={DiscordDefaultAvatar} alt="" onDragStart={(e) => e.preventDefault()} />
                <div>
                    <div className="gvp__guesses__item__name">You</div>
                    <div className="gvp__guesses__item__message">
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
                                                {k == 3 && j < splittedText.length - 1
                                                    ? emojis[0]
                                                    : null}
                                            </span>
                                        ));
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="actions-bar" onClick={copyToClipboard}>
                    {hasCopied ? null : (
                        <div className="action-help">Copy</div>
                    )}
                    {hasCopied ? "✅" : (
                        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M3 16a1 1 0 0 1-1-1v-5a8 8 0 0 1 8-8h5a1 1 0 0 1 1 1v.5a.5.5 0 0 1-.5.5H10a6 6 0 0 0-6 6v5.5a.5.5 0 0 1-.5.5H3Z" ></path><path fill="currentColor" d="M6 18a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4h-3a5 5 0 0 1-5-5V6h-4a4 4 0 0 0-4 4v8Z" ></path><path fill="currentColor" d="M21.73 12a3 3 0 0 0-.6-.88l-4.25-4.24a3 3 0 0 0-.88-.61V9a3 3 0 0 0 3 3h2.73Z" ></path></svg>
                    )}
                </div>
            </div>
            
            <div className="inputs">
                <input
                    type="text"
                    maxLength={8}
                    className="text-input"
                    placeholder="Some text..."
                    value={text}
                    onChange={filterText}
                />
                <input
                    type="text"
                    name="1"
                    className="text-input emoji-input"
                    value={emojis[1]}
                    onChange={filterEmoji}
                    onFocus={(e) => e.target.select()}
                />
                <input
                    type="text"
                    name="0"
                    className="text-input emoji-input"
                    value={emojis[0]}
                    onChange={filterEmoji}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            {/* Tips: use Windows Key + . or Command + Control + Spacebar  */}
        </div>
    );
};

export default App;
