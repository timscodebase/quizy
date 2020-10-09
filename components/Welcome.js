import PropTypes from "prop-types";
import { useFormik } from "formik";

// Styles
import AppStyles from "../styles/App.module.css";
import FormStyles from "../styles/Form.module.css";

// Data
import categories from "../data/categories";

export default function Welcome({ setFormConfig, setStarted }) {
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

  return (
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
  );
}

Welcome.propTypes = {
  setFormConfig: PropTypes.func,
  setStarted: PropTypes.func,
};
