import React, {useState, useRef, useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path="/" component={StateExampleComponent}/>
      <Route exact path="/useRef" component={UseRefExampleComponent}/>
      <Route exact path="/useEffect" component={UseEffectExampleComponent}/>
      </Router>
    </div>
  );
}


const StateExampleComponent = () => {
  const [inputText, setInputText] = useState('');
  const [historyList, setHistoryList] = useState([]);
  return (<div>
    <input onChange={e=>{setInputText(e.target.value);
      setHistoryList([...historyList, e.target.value]);
    }}/>
    <br/>
    {historyList.map((data)=>{
      return <p>{data}</p>
    })}
  </div>);
}

const UseRefExampleComponent = () => {
  let primaryImage = 'https://brandpalettes.com/wp-content/uploads/2018/10/Apple-300x300.png';
  let secondaryImage = 'https://inthequietness.files.wordpress.com/2015/01/striped_apple_logo.png?w=300&h=300';
  const imageRef = useRef(null);

  return (
    <img 
      onMouseOver={()=>{
        imageRef.current.src= secondaryImage;
      }}
      onMouseOut={()=>{
        imageRef.current.src= primaryImage;
      }}
    src={primaryImage}
    ref={imageRef}
    />
  );
}

const UseEffectExampleComponent = () => {
  const [inputValue, setInputValue] = useState('');
  useEffect(()=>{
    console.log('Loaded');
    return () => {console.log('Out Loaded')}
  }, [inputValue])
  return (
    <div>
      <input onChange={e=>{setInputValue(e.target.value);}}/>
    </div>
  );
}
export default App;
