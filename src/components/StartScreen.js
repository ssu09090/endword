import { useState } from "react";
const StartScreen = ({ onStart }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //새로고침중지
    if (input.trim()) {
      onStart(input.trim());
    } else {
      alert ("시작 단어를 입력하세요");
    }
  };

  return (
    <div className="start-screen">
      <h1>
        심심이랑 <br /> 끝말잇기
      </h1>
      <form onSubmit={handleSubmit} className="input-form">
        <h2>시작 단어를 입력하세요</h2>
        <input
          type="text"
          value={input}
          placeholder="단어 입력"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="submit">시작</button>
      </form>
    </div>
  );
};

export default StartScreen;

/*
1. StartScreen.js -> input value 읽어오기
2. App.js startWord에 1번 input value 전달
3. App.js started 값이 true로 변경
4. App.js startWord 값을 GameScreen.js에 전달
*/
