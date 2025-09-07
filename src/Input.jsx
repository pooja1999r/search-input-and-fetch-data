import { useState, useEffect, useMemo } from "react";
import { Debounce } from "./Debounce";

const Input = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [responseValue, setResponseValue] = useState({});

  const fetchData = async () => {
    setLoading(true);
    setResponseValue({});
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchInput}`
    );
    const data = await res.json();
    setResponseValue(data.products);
    console.log(data);
    setLoading(false);
  };

  const debouncedSearch = useMemo(
    () =>
      Debounce(() => {
        fetchData();
        console.log("called");
      }, 500),
    []
  );

  const handleInputValue = (e) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
    // will debounce so it will call only after a specific time after keypress stop
  };

  useEffect(() => {
    return () => debouncedSearch();
  }, []);

  return (
    <div>
      <h2> Type here for seach </h2>
      <input type="text" onChange={(e) => handleInputValue(e)} />
      {isLoading && <div> loading... </div>}
      {responseValue.length > 0 &&
        responseValue.map((i) => {
          return (
            <div key={i.id}>
              <span>
                {" "}
                <b>{i.brand} </b> {i.category}{" "}
              </span>
              <p> {i.description} </p>
            </div>
          );
        })}
    </div>
  );
};

export default Input;
