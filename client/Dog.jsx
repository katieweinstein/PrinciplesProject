import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Dog() {
  const [dogImages, setDogImages] = React.useState([]);

  React.useEffect(async () => {
    const imageList = await getDogImages();
    setDogImages(imageList);
  }, []);

  function createURL(URLid) {
    let name = URLid;
    if (URLid.includes('-')) {
      name = URLid.split('-');
      return `https://dog.ceo/api/breed/${name[1]}/${name[0]}/images/random/4`;
    } else {
      return `https://dog.ceo/api/breed/${name}/images/random/4`;
    }
  }

  let { id } = useParams();
  const dogName = id.replace(/-/g, ' ');

  async function getDogImages() {
    const URL = createURL(id);
    const response = await axios.get(URL);
    return response.data.message;
  }

  return (
    <div>
      <Link to={'/'}>← Back</Link>
      <div className="container">
        <h1>{dogName}</h1>
        <div className="linkContainer">
          {dogImages.map((item, index) => (
            <img src={item} alt={dogName} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
