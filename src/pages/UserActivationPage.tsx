import { AbsoluteCenter, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActivateUser from "../hooks/useActivateUser"; // Update the import path to your hook

interface RouteParams {
  uid: string;
  token: string;
  [key: string]: string | undefined;
}

const UserActivationPage = () => {
  const { uid, token } = useParams<RouteParams>();
  const { mutate, ...mutation } = useActivateUser();
  // const resendActivationEmail = useResendActivationEmail();
  // Implement resend activation email hook?

  useEffect(() => {
    if (uid && token) {
      mutate({ uid, token });
    }
  }, [uid, token, mutate]);

  let content;

  if (mutation.isLoading) {
    content = <Heading>Activating account...</Heading>;
  } else if (mutation.isError) {
    let errorMessage = mutation.error.message;
    console.log("SERVER: " + errorMessage);

    if (errorMessage === "Stale token for given user.") {
      errorMessage =
        "Link no longer valid. Request new activation email or login";
      content = <Heading>{errorMessage}</Heading>;
    } else {
      content = <Heading>{errorMessage}</Heading>;
    }
  } else if (mutation.isSuccess) {
    content = <Heading>Account activated successfully! Please login</Heading>;
  }

  return <AbsoluteCenter>{content}</AbsoluteCenter>;
};

export default UserActivationPage;
