import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const initialValues = { search: "" };

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const query = values.search.trim();

          if (query === "") {
            toast.error("Please enter a search term!");
            return;
          }

          onSubmit(query);
          actions.resetForm();
        }}>
        <Form className={s.form}>
          <Field
            className={s.formInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={s.formButton} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
