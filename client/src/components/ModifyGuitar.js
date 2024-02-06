import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ModifyGuitar = ({ match }) => {
  const [guitar, setGuitar] = useState(null);

  useEffect(() => {
    // Fetch the specific guitar data based on the ID from the URL parameter
    const guitarId = match.params.id;

    fetch(`${serverURL}/guitars/${guitarId}`)
      .then((response) => response.json())
      .then((data) => setGuitar(data))
      .catch((error) => console.error('Error fetching guitar:', error));
  }, [match.params.id]);

  if (!guitar) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={{
        model: guitar.model,
        description: guitar.description,
        isSelling: guitar.is_selling,
        price: guitar.price || '',
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
      onSubmit={async (values, { setSubmitting }) => {
        // Assuming the server supports PATCH requests for modifying the guitar
        try {
          const response = await fetch(`${serverURL}/guitars/${guitar.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            // Handle error if the server response is not successful
            console.error('Failed to modify guitar:', response.statusText);
          } else {
            // Handle success, e.g., redirect or show a success message
            console.log('Guitar modified successfully');
          }
        } catch (error) {
          // Handle any network or other errors
          console.error('Error modifying guitar:', error);
        }

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

        <button type="submit">Modify Guitar</button>
      </Form>
    </Formik>
  );
};

export default ModifyGuitar;
