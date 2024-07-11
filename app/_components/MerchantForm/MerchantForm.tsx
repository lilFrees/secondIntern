import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

function MerchantForm() {
  function validateName(value: string) {
    let error;
    if (value.length === 0) {
      error = "Name is required";
    }
    return error;
  }

  function validatePhoneNumber(phoneNumber: string) {
    // Regular expression to match optional '+' at the start and digits
    const phoneRegex = /^\+?\d{8,15}$/;

    if (phoneRegex.test(phoneNumber)) return "";
    return "Please enter a valid phone number";
  }

  function validateRegular(value: string) {
    let error;
    if (value.length === 0) {
      error = "This field is required";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ name: "", phoneNumber: "", brand: "", about: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form className="my-7 flex flex-col gap-7">
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder="Full name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="phoneNumber" validate={validatePhoneNumber}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.phoneNumber && form.touched.phoneNumber}
              >
                <FormLabel>Phone number</FormLabel>
                <Input {...field} placeholder="Phone number" />
                <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="brand" validate={validateRegular}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.brand && form.touched.brand}>
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder="Your Company Brand" />
                <FormErrorMessage>{form.errors.brand}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="about" validate={validateRegular}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.about && form.touched.about}>
                <FormLabel>Tell us about your company</FormLabel>
                <Input
                  {...field}
                  placeholder="Brief description of a company"
                />
                <FormErrorMessage>{form.errors.about}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="green"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default MerchantForm;
