import { useState } from "react";
import Header from "./components/Header"
import Results from "./components/Results"
import UserInput from "./components/UserInput"

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue, // 문자열을 숫자 값으로 변환
      }
    });
  }
  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      <Results input={userInput}/>
    </>
  )
}

export default App
