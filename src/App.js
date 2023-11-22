
import './App.css';
import * as React from 'react';

const initialStories = [
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

const storiesReducer = (state, action) => {
  switch (action.type) {
  case 'STORIES_FETCH_INIT':
  return {
  ...state,
  isLoading: true,
  isError: false,
  };
  case 'STORIES_FETCH_SUCCESS':
  return {
  ...state,
  isLoading: false,
  isError: false,
  data: action.payload,
  };
  case 'STORIES_FETCH_FAILURE':
  return {
  ...state,
  isLoading: false,
  isError: true,
  };
  case 'REMOVE_STORY':
  return {
  ...state,
  data: state.data.filter(
  (story) => action.payload.objectID !== story.objectID
  ),
  };
  default:
  throw new Error();
  }
  };
  

const getAsyncStories = () =>
  new Promise((resolve) =>
  setTimeout(
  () => resolve({ data: { stories: initialStories } }),
  2000
  )
);


// Arrow Function:
const App =()=> {
  
  

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
  // const [stories, setStories] = React.useState([]); >> we will use the useReducer hook instead
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {
      data: [],
      isError: false,
      isLoading: false,
    });  
  

  React.useEffect(() => {
    dispatchStories({type: 'STORIES_FETCH_INIT'});
    
    getAsyncStories().then(result => {
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.stories,
        });
    })
    .catch(()=>
     dispatchStories({type: 'STORIES_FETCH_FAILURE'})
     );
    }, []);


  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
      });
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.data.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()));
  

  return (

    <div className="App">
      
      <h1>My Haker Stories</h1>

      <InputWithLabel 
        id='search'
        value={searchTerm}
        onInputChange={handleSearch}
        isFocused
        children
      >
        
        <strong>Search:</strong>
        {/* children ^^^ */} 
      </InputWithLabel>
    
      <hr/>
      {stories.isError && <p>Something went wrong...</p>}
      {stories.isLoading ? (
          <p>Loading...</p>
        ) : (
          <List list={searchedStories}  onRemoveItem = {handleRemoveStory}/>
        )}
    </div>
    
  );
}

// Function Expression:
const InputWithLabel = function({id,value,type='text',children,onInputChange,isFocused}) {

  const inputRef = React.useRef();

  React.useEffect(()=>{
    if(isFocused) {
      inputRef.current.focus();
    }
    
  }, [isFocused]);
  
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input id={id} type={type} value={value} onChange={onInputChange} ref={inputRef}/>
    </>
  )
}


// Function Declaration:
function List ({list, onRemoveItem}){
  
  return (
    <div>
    
      <ul>
          {list.map(function(item){
            return(
                <Item
                 key={item.objectID} 
                 item={item}
                 onRemoveItem = {onRemoveItem} />
                );
          })}
      </ul>
    </div>
  )
 }
const Item = ({item, onRemoveItem}) => { // props Destructuring
  return(
    <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type='button' onClick={ () => onRemoveItem(item)}>
        Remove
      </button>
    </span>
    </li>
  )
}



export default App;
