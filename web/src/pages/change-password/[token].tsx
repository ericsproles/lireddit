import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import router from "next/dist/next-server/lib/router/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMaps";
import login from "../login";

export const Changepassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          //   const response = await login(values);
          //   console.log("response:", response);
          //   response.data?.login.user?.username;
          //   if (response.data?.login.errors) {
          //     [{ field: "username", message: "something wrong" }];
          //     setErrors(toErrorMap(response.data.login.errors));
          //   } else if (response.data?.login.user) {
          //     // worked
          //     router.push("/");
          //   }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            ></InputField>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

Changepassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default Changepassword;
