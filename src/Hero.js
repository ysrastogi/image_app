import React from "react";
import { useState, useEffect } from "react";
import Masonry from "react-responsive-masonry";
import Card from "./Card";
import axios from "axios";
import First from "./First";
import { Button, useMediaQuery, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/styles";

export default function Images() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkmode")
      ? localStorage.getItem("darkmode") === "true"
      : false
  );
  React.useEffect(() => {
    setInterval(() => {
      setDarkMode(
        localStorage.getItem("darkmode")
          ? localStorage.getItem("darkmode") === "true"
          : false
      );
    }, 100);
  });

  useEffect(() => {
    setLoading(true);
    const fetchImages = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos?client_id=ZhUqzz2VAoOAxlQRsDwpDgOFnlPn-o7siZHqqGKc2RY`
      );
      const data = await response.json();
      console.log(data);
      setImages(data);
      setLoading(false);
    };

    fetchImages();
  }, []);

  const loadMoreImages = () => {
    setLoading(true);
    if (search.length > 0) {
      axios
        .get(
          "https://api.unsplash.com/search/photos?&page=" +
            page +
            1 +
            "&query=" +
            search,
          {
            headers: {
              Authorization:
                "Client-ID " + 'ZhUqzz2VAoOAxlQRsDwpDgOFnlPn-o7siZHqqGKc2RY',
            },
          }
        )
        .then((res) => {
          res.data.results.map((elm) => {
            setImages((oldData) => [...oldData, elm]);
          });
          console.log(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      axios
        .get("https://api.unsplash.com/photos?page=" + page + 1, {
          headers: {
            Authorization:
              "Client-ID " + 'ZhUqzz2VAoOAxlQRsDwpDgOFnlPn-o7siZHqqGKc2RY',
          },
        })
        .then((res) => {
          res.data.map((elm) => {
            setImages((oldData) => [...oldData, elm]);
          });
          console.log(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }

    setPage(page + 1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    console.log(value);
    setLoading(true);
    if (value.length !== 0) {
      axios
        .get("https://api.unsplash.com/search/photos?&page=1&query=" + value, {
          headers: {
            Authorization:
              "Client-ID " + 'ZhUqzz2VAoOAxlQRsDwpDgOFnlPn-o7siZHqqGKc2RY',
          },
        })
        .then((res) => {
          setImages(res.data.results);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get("https://api.unsplash.com/photos?page=1", {
          headers: {
            Authorization:
              "Client-ID " + 'ZhUqzz2VAoOAxlQRsDwpDgOFnlPn-o7siZHqqGKc2RY',
          },
        })
        .then((res) => {
          setImages(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const image = images.map((image, id) => {
    return <Card key={id} image={image} />;
  });
  return (
    <>
      <First searchItem={handleSearch} />
      <div
        style={{
          marginTop: "5rem",
          backgroundColor: darkMode ? "#232323" : "#FFFFFF",
        }}
      >
        <div className="home__top">
          <h1 className="home__top__heading">
            Download High Quality Images by Creators
          </h1>
          <p className="home__top__text">
            Over 2.4 million+ stock Images by our talented community
          </p>
          <input
            style={{ width: matchesSM ? 400 : 808 }}
            type="text"
            placeholder="Search high resolution Images, categories, wallpapers"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            className="home__top__search"
          />
        </div>
        <div style={{ padding: "9%" }}>
          <Masonry
            columnsCount={matchesSM ? 1 : matchesMD ? 2 : 3}
            gutter="20px"
          >
            {image}
          </Masonry>
        </div>
        <div
          style={{
            paddingBottom: "9%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Button
          variant='outlined'
            className={
              darkMode
                ? "btn btn-outline-light mt-5 text-white"
                : "btn btn-outline-dark mt-5"
            }
            onClick={loadMoreImages}
          >
            Load More
          </Button>
        </div>
      </div>
    </>
  );
}
