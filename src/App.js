// importing all the necessary files
import React, { useEffect, useState } from "react";
import "./App.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Container,
  Paper,
} from "@material-ui/core";
const axios = require("axios");

const useStyles = makeStyles({
  container: {
    marginTop: 50,
    maxHeight: 585,
  },
});

function App() {
  const classes = useStyles();

  // url request
  const url = "https://fetch-hiring.s3.amazonaws.com/hiring.json";

  // state to store json data
  const [data, setData] = useState(undefined);
  // state to set loading
  const [loading, setLoading] = useState(true);

  // it will only run once while loading
  useEffect(() => {
    console.log("search useEffect fired");
    async function fetchData() {
      try {
        // axios call to get data
        const urlData = await axios.get(url);

        // filtering all data without any name
        let filterData = urlData.data.filter((data) => {
          return data.name;
        });

        // sorting data first with listId and then with name
        filterData.sort(function (a, b) {
          return a.listId === b.listId
            ? +a.name.split(" ")[1] - +b.name.split(" ")[1]
            : a.listId - b.listId;
        });

        // setting data to state and updating loading state to false
        setData(filterData);
        setLoading(false);
      } catch (e) {
        console.log("error:", e);
      }
    }
    fetchData();
  }, []);

  // until we get the data we will see this loading
  if (loading) {
    return (
      <div className="App">
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">Json Data</header>

        {/* table container */}
        <Container maxWidth="xs">
          <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">List Id</TableCell>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                </TableRow>
              </TableHead>
              {data.map(function (row) {
                return (
                  <TableBody key={row.id}>
                    <TableRow>
                      <TableCell align="center">{row.listId}</TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        </Container>

        <footer className="App-footer">End</footer>
      </div>
    );
  }
}

export default App;
