import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";

import Quiz from "../components/Quiz";

import AppStyles from "../styles/App.module.css";
import FormStyles from "../styles/Form.module.css";

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
    <div className={AppStyles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={AppStyles.main}>
        {started ? (
          <Quiz {...formConfig} />
        ) : (
          <>
            <h1 className={AppStyles.title}>Let's get Quizy</h1>
            <form className={FormStyles.form} onSubmit={formik.handleSubmit}>
              <label htmlFor="amount">How many question do you want?</label>
              <input
                id="amount"
                name="amount"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.amount}
              />
              <label htmlFor="category">Category</label>
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
              <label htmlFor="difficulty">Difficulty</label>
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
              <button className={AppStyles.button} type="submit">
                Start
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
