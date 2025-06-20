import { useEffect, useState } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import "./App.scss";

const App = () => {
  const START_KEY = "start_word"
  const [started,setStarted]=useState(false);
  const [startWord, setStartWord] = useState("");

  const handleStart = (word) => {
    // localStorage.setItem(START_KEY, word);
    setStartWord(word);
    setStarted(true);
  };

  useEffect(()=>{
    const startmode = localStorage.getItem(START_KEY);
    if(startmode){
      setStartWord(startmode);
    }
  },[])

  return (
    <div className="app">
      {!started ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <GameScreen startWord={startWord} />
      )}
    </div>
  );
};

export default App;