import { Box, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode
}

export default function AuthCard({ children }: AuthCardProps) {
    return (
        <Flex align="center" justify="center" minH="calc(100vh - 70px)" bg="gray.50">
            <Box p={8} rounded="lg" shadow="md" w="400px">
                {children}
            </Box>
        </Flex>
    );
}
