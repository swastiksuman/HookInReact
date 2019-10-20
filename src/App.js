import React, {useState, useRef, useEffect, useContext, useCallback} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import './App.css';

export const UserContext = React.createContext()
export const AppContext = React.createContext()
function App() {
  return (
    <div className="App">
      <UserContext.Provider value={'Swastik'}>
        <AppContext.Provider value={"MyApp"}>
          <Router>
          <Route exact path="/" component={StateExampleComponent}/>
          <Route exact path="/useRef" component={UseRefExampleComponent}/>
          <Route exact path="/useEffect" component={UseEffectExampleComponent}/>
          <Route exact path="/useContext" component={AComponent}/>
          <Route exact path="/useCallback" component={UseCallbackComponent}/>
          </Router>
          </AppContext.Provider>
      </UserContext.Provider>
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

const AComponent = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <BComponent></BComponent>
          </Col>
          <Col>
            <CComponent></CComponent>
          </Col>
          <Col>
            <DComponent></DComponent>
          </Col>
        </Row>  
      </Container>
    </div>
  );
}

const BComponent= () => {
  return (
    <div>
      <p>B Component</p>
    </div>
  );
}

const CComponent= () => {
  return (
    <div>
      <p>C Component</p>
    </div>
  );
}

const DComponent= () => {
  return (
    <Col class="md-6">
      <EComponent></EComponent>
    </Col>
  );
}

const EComponent= () => {
  return (
    <Col>
      <FComponent></FComponent>
    </Col>
  );
}

const FComponent= () => {
  const user = useContext(UserContext);
  const app = useContext(AppContext);
  return (
    <Col>
      <p>F Component</p>
      {/* <UserContext.Consumer>
        {
          user =>{
            return <div>{user}</div>
          }
        }
      </UserContext.Consumer> */ app  } - { user }
    </Col>
  );
}

const UseCallbackComponent = () => {
  const [salary, setSalary] = useState(50000);
  const [age, setAge] = useState(25);

  const incrementAge = useCallback(() => {
    setAge(age + 1);
  }, [age])
  const incrementSalary = useCallback(() => {
    setSalary(salary+1000);
  }, [salary]);
  return (
    <div>
      <SmartCount text="Age" count={age} />
      <SmartButton handleClick={incrementAge}>Increment Age</SmartButton>
      <SmartCount text="Salary" count={salary} />
      <SmartButton handleClick={incrementSalary}>Increment Salary</SmartButton>
  </div>
  );
}

const Button = ({ handleClick, children}) => {
  console.log('Rendering Button ' + children);
  return(
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

const SmartButton = React.memo(Button);

const Count = ({ text, count }) => {
  console.log(count + "rendered");
  return <div>{text} - {count}</div>
}

const SmartCount = React.memo(Count);
export default App;
