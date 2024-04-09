import "./styles.css";
import { useState, useEffect } from "react";
import axios from 'axios'

export default function App() {
  const [suggestion, setSuggestion] = useState(false);
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])

  const fetchData = async (query) => {

    try {
      const token = await axios.get(`https://jsonplaceholder.typicode.com/photos/${query}`);
      setData(token.data);
      console.log(data)


    }
    catch (e) {
      console.log('getting Error while search via APi', e)
    }
  }


  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData(query)
    }, 100);
    return () => {
      clearTimeout(timeOut)
    }

  }, [query])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }
  return (
    <div className="App">
      <input type='text' name='search' id='search'
        placeholder="Enter your Query"
        onFocus={() => setSuggestion(true)}
        onBlur={() => setSuggestion(false)}
        onChange={handleChange} />
      {data &&
        <div className="suggestion" >
          <div className="card">
            <img src={data.thumbnailUrl} alt="Avatar" style={{ width: "100%" }} />
            <div className="container">

              <p>{data.title}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
