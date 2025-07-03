import { Box, Button, Flex, Progress, Spinner, Text } from "@radix-ui/themes";
import React from "react";

const SignIn = () => {
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
      <Box maxWidth="300px">
        <Progress className="bg-background" />
      </Box>
      <Spinner />
    </Flex>
  );
};

export default SignIn;
