import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  /* breedList is the full list of breeds from the API. filteredBreedList is the
  list created each time a user adds input to the search bar. We need to store
  the full breed list from the API so that filteredBreedList can refer back to
  it to re-include breeds if the user deletes input. */
  const [breedList, setBreedList] = React.useState([]);
  const [filteredBreedList, setFilteredBreedList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Get the list of breeds from the API when the component loads.
  React.useEffect(async () => {
    const list = await getBreedList();
    const organizedList = organizeBreedNames(list);
    setBreedList(organizedList);
  }, []);

  async function getBreedList() {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    return response.data.message;
  }

  // Format the breed names with spaces and sort them alphabetically.
  function organizeBreedNames(list) {
    let finalList = [];
    for (let breed in list) {
      // If the general breed has sub-breeds, reorder the names and add a space.
      if (list[breed].length) {
        for (let descriptor of list[breed]) {
          finalList.push(descriptor + ' ' + breed);
        }
      } else {
        finalList.push(breed);
      }
    }
    // Sort alphabetically.
    finalList.sort();
    return finalList;
  }

  // If a user types input, filter the list of breeds as they type.
  async function filterBreeds(query) {
    const filteredBreeds = breedList.filter((name) => name.includes(query));
    setFilteredBreedList(filteredBreeds);
  }

  return (
    <div className="container">
      <div className="container">
        <h1>Get your random dog pictures here!</h1>
        <input
          type="text"
          onChange={() => {
            setSearchQuery(event.target.value);
            filterBreeds(event.target.value);
          }}
          value={searchQuery}
          placeholder="Search for breeds..."
        />
      </div>
      <div className="linkContainer">
        {/* If the user has begun typing a search query, render links to the Dog
        component using filteredBreedList. Otherwise, just use the full breedList. */}
        {searchQuery.length
          ? filteredBreedList.map((item, index) => {
              const URLname = item.replace(/\s/g, '-');
              return (
                <Link to={`/${URLname}`} key={index} className="link container">
                  {item}
                </Link>
              );
            })
          : breedList.map((item, index) => {
              const URLname = item.replace(/\s/g, '-');
              return (
                <Link to={`/${URLname}`} key={index} className="link container">
                  {item}
                </Link>
              );
            })}
      </div>
    </div>
  );
}
