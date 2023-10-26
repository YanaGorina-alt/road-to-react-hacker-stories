
import './App.css';
import * as React from 'react';


// Arrow Function:
const App =()=> {
  
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()));
  

  return (

    <div className="App">
      
      <h1>My Haker Stories</h1>
      <Search onSearch={handleSearch} searchTerm={searchTerm}/>
      <hr/>
      <List list={searchedStories} title="React Ecosystem"/>
    </div>
    
  );
}


// Function Declaration:
function List (props){
  const {title, list} = props; // props Destructuring
  return (
    <div>
      <h2>{title}</h2>
      <ul>
          {list.map(function(item){
            return(
                <Item item={item} />
                );
          })}
      </ul>
    </div>
  );
}

const Item = ({item}) => { // props Destructuring
  return(
    <li key={item.objectID}>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    </li>
  )
}
// Function Expression:
let Search = function(props) {
  

  const handleChange = (event) => {
    props.onSearch(event);
  }
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>

      <p>
        Searhing for <strong>{props.searchTerm}</strong>
      </p>
    </div>
  )
}


export default App;
