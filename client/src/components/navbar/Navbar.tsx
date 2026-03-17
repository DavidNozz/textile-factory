import { Box, Flex, Heading } from "@chakra-ui/react";

export default function Navbar() {
    return (
        <Box as="nav" width="100%" height="70px" borderBottom="1px solid" borderColor="gray.200" px={6} py={4}>
            <Flex align="center" justify="space-between">
                <Heading size="3xl">
                    Textile Factory
                </Heading>
            </Flex>
        </Box>
    );
}
