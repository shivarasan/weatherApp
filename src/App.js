import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import ReactJson from "react-json-view";

// use the component in your app!

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filteredResult, setFilterResult] = useState([]);
  const handleSearch = async () => {
    const result = await axios.get(
      `http://api.weatherstack.com/current?access_key=7c993391f5248d9e441596e4808136f0&query=${searchInput}`,
      {
        headers: {
          Cookie: "__cfduid=dde248925e46d9f5f7f2631019a1e9da41588689244",
        },
      }
    );
    if (!result.data.error) {
      setSearchResult([
        ...searchResult,
        { ...result.data.location, ...result.data.current },
      ]);
      setFilterResult([
        ...searchResult,
        { ...result.data.location, ...result.data.current },
      ]);
    }
  };
  const handleFilter = (key) => {
    const tempResult = [...searchResult];
    const filterPattern = RegExp(key, "gi");
    const filteredResult = !key
      ? tempResult
      : tempResult.filter((item) => filterPattern.test(item.name));
    setFilterResult(filteredResult);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <FormControl
            type="text"
            placeholder="Filter by location name"
            className="mr-sm-2"
            // value={searchInput}
            onChange={(e) => handleFilter(e.target.value)}
          />
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="outline-info" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </Navbar>
      {filteredResult.length
        ? filteredResult.map((resultObj, key) => (
            <div key={key} style={{ borderStyle: "groove" }}>
              <ReactJson
                src={resultObj}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                name={false}
                shouldCollapse={() => false}
              />
            </div>
          ))
        : null}
    </>
  );
}

export default App;
