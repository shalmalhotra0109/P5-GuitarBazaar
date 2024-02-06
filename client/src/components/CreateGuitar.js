import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CreateGuitar = () => {
  return (
    <Formik
      initialValues={{
        model: '',
        description: '',
        isSelling: false,
        price: '',
      }}
      validate={(values) => {
        const errors = {};

        if (!values.model) {
          errors.model = 'Model cannot be empty';
        }

        if (values.description.length > 350) {
          errors.description = 'Description cannot exceed 350 characters';
        }

        if (values.isSelling && !values.price) {
          errors.price = 'Price is required when the guitar is for sale';
        }

        return errors;
      }}
      onSubmit: async (values) => {
        values.owner_id = theUser.id
        fetch(`$serverURL}/guitars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)

        })
        // Handle form submission logic here
        console.log(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <div>
          <label htmlFor="model">Model</label>
          <Field type="text" id="model" name="model" />
          <ErrorMessage name="model" component="div" />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Field as="textarea" id="description" name="description" />
          <ErrorMessage name="description" component="div" />
        </div>

        <div>
          <label>
            Is Selling
            <Field type="checkbox" id="isSelling" name="isSelling" />
          </label>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <Field type="text" id="price" name="price" />
          <ErrorMessage name="price" component="div" />
        </div>

        <button type="submit">Create Guitar</button>
      </Form>
    </Formik>
  );
};

export default CreateGuitar;
