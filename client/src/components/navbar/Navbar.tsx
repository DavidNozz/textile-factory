import { navigationByRole } from "@/constants/role-based-access-control/navigationByRole";
import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ProfileMenu from "../profile-menu/ProfileMenu";
import { getCurrentUser } from "@/utils/storage/authStorage";

export default function Navbar() {
    useLocation();

    const user = getCurrentUser();
    const navigationItems = user ? navigationByRole[user.role] : [];

    return (
        <Box as="nav" width="100%" height="70px" borderBottom="1px solid" borderColor="gray.200" px={6} py={4}>
            <Flex align="center" justify="space-between">
                <Heading size="3xl">
                    Textile Factory
                </Heading>
                <HStack gap={6}>
                    {navigationItems.map((item) => (
                        <Link key={item.to} as={RouterLink} to={item.to} fontWeight="medium" color="gray.700" _hover={{ color: "blue.500", textDecoration: "none" }} _focus={{ outline: "none" }}>{item.label}</Link>
                    ))}
                    {user && (
                        <ProfileMenu/>
                    )}
                </HStack>
            </Flex>
        </Box>
    );
}
