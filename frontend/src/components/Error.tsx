import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    // Errors thrown by loaders/actions via `new Response()`
    if (error.status === 404) {
      title = "Product not found";
      message = error.data || "The product you are looking for does not exist.";
    } else if (error.status === 400) {
      title = "Bad request";
      message = error.data || "Invalid request.";
    } else {
      title = "Server error";
      message = error.data || "Please try again later.";
    }
  }

  return (
    <Box p={6}>
      <Heading size="md" mb={3}>
        {title}
      </Heading>

      <Text mb={6}>{message}</Text>

      <Button colorScheme="blue" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default Error;
