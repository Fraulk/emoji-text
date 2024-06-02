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
        <>
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
                                            const letterWidth = letters[letter as Letter][0].length;
                                            const spacePos = letterWidth == 5 ? 4 : 3;
                                            return [...Array(letterWidth)].map((_, k) => (
                                                <span key={k}>
                                                    {emojis[letters[letter as Letter][i][k]]}
                                                    {k == spacePos && j < splittedText.length - 1
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
                <div className="tips">
                    <div className="tip"><span>Tip:</span> Use Windows Key + <span style={{fontSize: ".9rem"}}>.</span> (period) or Command + Control + Spacebar to open the native emoji selector</div>
                    <div className="tip"><span>Tip:</span> You can also use custom emojis, but keep in mind that uses more characters so if you don't have nitro you might not be able to use more than 5 character text</div>
                    <div className="tip"><span>Tip:</span> To get the custom emoji ID, you need to send an emoji with "\" right before. ex: send "\😍" and copy all the text</div>
                </div>
            </div>
            <div className="socials">
                <a className="socials__item twitter" href="https://twitter.com/freaksboi" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" fill="currentColor" /></svg>
                </a>
                <a className="socials__item github" href="https://github.com/fraulk/emoji-text" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" fill="currentColor" /></svg>
                </a>
            </div>
        </>
    );
};

export default App;
