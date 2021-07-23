import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function Dog() {
  const [dogImages, setDogImages] = React.useState([]);

  // Get the dog images from the API when the component renders.
  React.useEffect(async () => {
    const imageList = await getDogImages();
    setDogImages(imageList);
  }, []);

  // This creates the URL with the breed name to make the API call.
  function createURL(URLid) {
    let name = URLid;
    if (URLid.includes('-')) {
      name = URLid.split('-');
      return `https://dog.ceo/api/breed/${name[1]}/${name[0]}/images/random/4`;
    } else {
      return `https://dog.ceo/api/breed/${name}/images/random/4`;
    }
  }

  // This is the dog name from the URL.
  let { id } = useParams();
  // Replace the - with a space to use as the page title and alt text for the image.
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
