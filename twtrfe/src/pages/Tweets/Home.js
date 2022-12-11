import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import TweetList from "./TweetList";
import { qs } from "../../query-param";
//import axios from 'axios';

const THome = () => {
  const [tweets, setTweets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch("http://localhost:5000/tweets-results");
      //const res = await fetch(`${process.env.REACT_APP_BE_NETWORK}:${process.env.REACT_APP_BE_PORT}/tweets-results`);
      // const res = await fetch(
      //   `${process.env.REACT_APP_API_SERVICE_URL}/tweets-results`
      // );
      // const res = await fetch(`tweets-results`);
      const res = await fetch(`${qs["twtrbe"]}/tweets-results`);
      const { results } = await res.json();
      console.log(results);
      setTweets([...results]);
      setLoading(false);
    };

    // console.log(
    //   "Home.js: fetching from " +
    //     `${process.env.REACT_APP_API_SERVICE_URL}/tweets-results`
    // );
    console.log("Home.js: fetching from " + `${qs["twtrbe"]}/tweets-results`);
    fetchData();
  }, []);

  return (
    <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={[styles.centering]}
          color="#ff8179"
          size="large"
        />
      ) : (
        <TweetList tweets={tweets} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    marginTop: "60px",
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100vh",
  },
});

export default THome;
