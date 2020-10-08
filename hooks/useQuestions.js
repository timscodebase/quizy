import { useState, useEffect } from "react";

export default function useQuestions(url) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    setLoading(false);

    const result = await fetch(
      "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.results);
        setQuestions(data.results);
      })
      .catch((err) => {
        console.error("Error:", err);
        setHasError(false);
      });
    setLoading(false);
    fetchData();
  };
  return [questions, loading, hasError, fetchData];
}
