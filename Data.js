import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import groupBy from "lodash/groupBy";
import "./Data.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const jobFilters = [
  {
    label: "ALL LOCATIONS",
    key: "location",
  },
  {
    label: "All TEAMS",
    key: "team",
  },
  {
    label: "All WORK TYPES",
    key: "commitment",
  },
];

const DataFetch = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [filters, setFilters] = useState({});

  const [activeFilters, setActiveFilters] = useState(() => {
    var activeFilters = {};

    jobFilters.forEach((filter) => (activeFilters[filter.key] = "all"));

    return activeFilters;
  });

  useEffect(() => {
    axios
      .get("https://api.lever.co/v0/postings/paralleldomain?mode=json")
      .then((res) => {
        let positions = [];
        let filters = {};
        let activeFilters = {};
        let existedFilter = {};

        res.data.forEach((position) => {
          let { categories } = position;

          //Dynamically populated filters
          for (let categoryName in categories) {
            let category = categories[categoryName];
            if (!existedFilter[category]) {
              if (typeof filters[categoryName] == "undefined") {
                filters[categoryName] = [];
                activeFilters[categoryName] = category;
              }
              filters[categoryName].push(category);
              existedFilter[category] = true;
            }
          }
          positions.push({
            categories,
            applyUrl: position.applyUrl,
            hostedUrl: position.hostedUrl,
            text: position.text,
          });
        });

        setFilters(filters);
        setPosts(positions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (posts) {
      let filteredPositions = [...posts];
      // filter all the job positions
      for (let filterKey in activeFilters) {
        if (activeFilters[filterKey] !== "all") {
          filteredPositions = filteredPositions.filter((pos) => {
            return pos.categories[filterKey] === activeFilters[filterKey];
          });
        }
      }
      // grouping jobs acc to categories
      filteredPositions = groupBy(filteredPositions, function (n) {
        return n.categories.team;
      });
      filteredPositions = Object.entries(filteredPositions);
      setFilteredPositions(filteredPositions);
      setLoading(false);
    }
  }, [posts, activeFilters]);

  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box
          pt={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            "@media screen and (min-width: 800px)": {
              flexDirection: "row",
              alignItems: "center",
            },
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "14px",
              letterSpacing: "0.014em",
            }}
          >
            Filter By:
          </Typography>
          {jobFilters.map((filter) => {
            let { key, label } = filter;

            return (
              <FormControl
                key={key}
                sx={{
                  ml: 0,
                  mt: 2,
                  "@media screen and (min-width: 800px)": {
                    ml: 3,
                    mt: 0,
                  },
                }}
              >
                <Select
                  labelId={`filter-${key}-label`}
                  id={`filter-${key}`}
                  value={activeFilters[key] || ""}
                  label={key}
                  displayEmpty
                  onChange={(event) => {
                    setActiveFilters({
                      ...activeFilters,
                      [key]: event.target.value,
                    });
                  }}
                >
                  <MenuItem sx={{ color: "black" }} value={"all"}>
                    {label}
                  </MenuItem>

                  {filters[key] &&
                    filters[key].map((label) => (
                      <MenuItem
                        sx={{ color: "black" }}
                        key={label}
                        value={label}
                      >
                        {label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            );
          })}
        </Box>
      )}
      {filteredPositions.map((item, index) => (
        <div key={index}>
          <Typography
            variant="body1"
            sx={{
              color: "rgb(255, 172, 60)",
              textAlign: "left",
              mt: "60px",
              mb: "10px",
              fontSize: "15px",
              textTransform: "uppercase",
            }}
          >
            {item[0]}
          </Typography>
          {item[1].map((p, n) => (
            <div key={n}>
              <Link className="data" underline="none" href={p.hostedUrl}>
                <div className="main">
                  <Typography
                    component="h3"
                    sx={{ mb: "10px", fontSize: "24px" }}
                  >
                    {p.text}
                  </Typography>
                  <Typography
                    component="h6"
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "12px",
                      letterSpacing: "2.5px",
                    }}
                  >
                    {p.categories.location} / {p.categories.team}
                  </Typography>
                </div>
                <Button size="small" variant="outlined" href={p.applyUrl}>
                  Apply
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
};
export default DataFetch;
