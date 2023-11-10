
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

  // Instead of using two hooks separatly we'll make a custom hook

  // const [searchTerm, setSearchTerm] = React.useState(
  //    localStorage.getItem('search')||'React'
  //    );

  // React.useEffect(()=>{
  //   localStorage.setItem('search', searchTerm)}, [searchTerm]
  //   );

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key)||initialState
      );

    React.useEffect(()=>{
      localStorage.setItem(key, value)}, [value, key]
      );

      return [value, setValue]
  }

 
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()));
  

  return (

    <div className="App">
      
      <h1>My Haker Stories</h1>

      <InputWithLabel 
        id='search'
        label="Search :"
        value={searchTerm}
        type="text"
        onInputChange={handleSearch}
      />
    
      <hr/>
      <List list={searchedStories} title="React Ecosystem"/>
    </div>
    
  );
}

// Function Expression:
const InputWithLabel = function({id,label,value,type,onInputChange}) {
  
  return (
    <>
      <label htmlFor={id}>{label}</label>
      &nbsp;
      <input id={id} type={type} value={value} onChange={onInputChange}/>
    </>
  )
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
                <Item key={item.objectID} item={item} />
                );
          })}
      </ul>
    </div>
  )
 }
const Item = ({item}) => { // props Destructuring
  return(
    <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    </li>
  )
}



export default App;
