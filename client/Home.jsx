import React from 'react';
import axios from 'axios';

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
    <div>
      <input
        type="text"
        onChange={() => {
          setSearchQuery(event.target.value);
          filterBreeds(event.target.value);
        }}
        value={searchQuery}
        placeholder="Search for breeds..."
      />
      <ul>
        {searchQuery.length
          ? filteredBreedList.map((item, index) => <li key={index}>{item}</li>)
          : breedList.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}
