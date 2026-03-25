import { useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { Menu, IconButton, Portal } from "@chakra-ui/react";

export default function ProfileMenu() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("user");
        navigate("/sign-in");
    }

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <IconButton aria-label="Profile" variant="outline" size="md">
                    <LuUser/>
                </IconButton>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="editProfile" onSelect={() => navigate("/profile")}>Edit Profile</Menu.Item>
                        <Menu.Item value="logout" color="fg.error" _hover={{ bg: "bg.error", color: "fg.error" }} onSelect={handleLogout}>Logout</Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
}
