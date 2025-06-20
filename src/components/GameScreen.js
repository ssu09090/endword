import { useEffect, useRef, useState } from "react";
import { dictionary } from "../api/dictionary.js";

const GameScreen = ({ startWord }) => {
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const [words, setWords] = useState([startWord]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  //words 배열이 변경될 때 마다 bottomRef 객체로 이동
  useEffect(()=>{
    if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior:"smooth"});
    }
  },[words]);
  const addWord = (text) => {
    setWords((prev) => {
      return [...prev, text];
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //사용자에게 값을 입력 받으면 공백 제거
    const userWord = input.trim();
    if (!userWord) return;
    //마지막 글자와 같은지 비교
    //words의 마지막 단어의 마지막 글자 === userWord 첫번째 글자
    const lastWord = words[words.length - 1];
    if (userWord[0] !== lastWord[lastWord.length - 1]) {
      alert(`'${lastWord[lastWord.length - 1]}'(으)로 시작해야 합니다`);
      setInput("");
      return;
    }
    //사용자가 입력된 단어를 먼저 추가
    addWord(input.trim());
    setInput("");
    setLoading(true);
    //1초 후에 API 호출
    setTimeout(async () => {
      const lastChar = userWord[userWord.length - 1];
      const word = await dictionary(lastChar);
      if (word) {
        addWord(word);
      } else {
        alert("심심이가 단어를 찾지 못했습니다. 직접 입력해주세요");
      }
      setLoading(false);
      inputRef.current.focus();
    }, 1000);
  };

  return (
    <div className="game-screen">
      <h2>안녕! 나는 심심이야</h2>
      <ul className="word-list">
        {words.map((item, idx) => {
          return (
            <li key={idx}>
              <span>○</span>
              <span>{item}</span>
            </li>
          );
        })}
        <li ref={bottomRef} className="ref"></li>
      </ul>
      {loading && <p className="loading">심심이가 단어를 고민 중입니다</p>}
      <form className="game-form" onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="단어입력"
        />
        <button onClick={handleSubmit}>▶</button>
      </form>
    </div>
  );
};

export default GameScreen;
