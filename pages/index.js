import React, { useState } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { CustomPagination, MoviesTable } from "../components";
import axios from "axios";

export async function getStaticProps() {
  try {
    const { data } = await axios.get(`${process.env.APP_DOMAIN}/api/movies/0`);
    return { props: { ...data } };
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      length: 0,
      movies: [],
    },
  };
}

export default function Home({ movies, length }) {
  const [data, setData] = useState(movies);
  const [page, setPage] = useState(0);

  const handlePageChange = async (page) => {
    setPage(page);
    const { data } = await axios.get(`/api/movies/${page}`);
    setData(data.movies);
  };

  return (
    <div>
      <Head>
        <title>S3 project - Movie list</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container style={{ marginTop: "50px", textAlign: "center" }}>
        <h1>Movies</h1>
        <MoviesTable data={data} />
        <CustomPagination
          page={page}
          length={length}
          handlePageChange={handlePageChange}
        />
      </Container>
    </div>
  );
}
