import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [breedList, setBreedList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredBreedList, setFilteredBreedList] = React.useState([]);

  React.useEffect(async () => {
    const list = await getBreedList();
    organizeBreedNames(list);
  }, []);

  async function getBreedList() {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    return response.data.message;
  }

  function organizeBreedNames(list) {
    let finalList = [];
    for (let breed in list) {
      if (list[breed].length) {
        for (let descriptor of list[breed]) {
          finalList.push(descriptor + ' ' + breed);
        }
      } else {
        finalList.push(breed);
      }
    }
    finalList.sort();
    setBreedList(finalList);
  }

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
