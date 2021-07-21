import React from 'react';
import axios from 'axios';

export default function Home() {
  const [breedList, setBreedList] = React.useState([]);

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

  return (
    <div>
      <h1>This is the home page.</h1>
      <ul>
        {breedList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        <li></li>
      </ul>
    </div>
  );
}
