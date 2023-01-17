//import { Component } from 'react';
import { useState, useEffect} from 'react';

//import logo from './logo.svg';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () =>{
  const [searchField, setSearchField] = useState(''); //[value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setfilteredMonsters] = useState(monsters);

  console.log('render');

  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) =>response.json())
    .then((users) => setMonsters(users));
  }, []);
  //the () its to clarify that nothing its gonna change later that will invoke the fetch again

  useEffect(() =>{
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setfilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return(
    <div className="App">
        <h1 className='app-tittle'>Monsters Rolodex</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className='search-box' />
        <CardList monsters={filteredMonsters} />
      </div>
  );
}

/*
class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters:[],
      searchField: ''
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) =>response.json())
      .then((users) => 
        this.setState(
          ()=>{
            return { monsters: users };
          }
        )
      );
  }

  onSearchChange = (event) =>{
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return {searchField};
    });
  } 

  render(){

    //to avoid calling this.state and make the code small, we rename and store it with variables - its only for readable optimizations
    const { monsters, searchField } = this.state;
    const { onSearchChange }  = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className='app-tittle'>Monsters Rolodex</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className='search-box' />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
  }
*/
export default App;
