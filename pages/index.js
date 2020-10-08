import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";

import Quiz from "../components/Quiz";

import styles from "../styles/App.module.css";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [formConfig, setFormConfig] = useState();

  const formik = useFormik({
    initialValues: {
      amount: 10,
      category: 9,
      difficulty: "easy",
    },
    onSubmit: (values) => {
      setFormConfig(values);
      setStarted(true);
    },
  });

  const categories = [
    { name: "General Knowledge", id: "9" },
    { name: "Science: Computers", id: "18" },
    { name: "Geography", id: "22" },
    { name: "Politics", id: "24" },
    { name: "Entertainment: Books", id: "10" },
    { name: "Sports", id: "21" },
    { name: "Vehicles", id: "28" },
    { name: "Celebrities", id: "26" },
    { name: "Art", id: "25" },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {started ? (
          <Quiz {...formConfig} />
        ) : (
          <>
            <h1 className={styles.title}>Let's get Quizy</h1>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="amount">How many question do you want?</label>
              <input
                id="amount"
                name="amount"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.amount}
              />
              <label htmlFor="category">Last Name</label>
              <select
                id="category"
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
              >
                <option key="00" value="">
                  No Preference
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label htmlFor="difficulty">difficulty Address</label>
              <select
                id="difficulty"
                name="difficulty"
                onChange={formik.handleChange}
                value={formik.values.difficulty}
              >
                <option value="">No Preference</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <button className={styles.button} type="submit">
                Start
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
