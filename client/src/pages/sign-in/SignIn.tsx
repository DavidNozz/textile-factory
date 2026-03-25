import { AuthCard } from "@/components";
import { Button, Heading, Input, Text, Link, VStack, Image } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useState, type SubmitEvent } from "react";
import { useLogin } from "@/hooks/user";
import { toast } from "react-toastify";
import { setCurrentUser } from "@/utils/storage/authStorage";

export default function SignIn() {
    const navigate = useNavigate();
    const { mutate: login, isPending } = useLogin();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        login(form, {
            onSuccess: (data) => {
                toast.success(`Welcome back, ${data.name}!`);
                setCurrentUser(data);
                navigate("/tasks");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    }

    return (
        <AuthCard>
            <form onSubmit={handleSubmit}>
                <VStack gap={4} align="stretch">
                    <Image src={logo} boxSize="90px" mx="auto"/>
                    <Heading size="lg" textAlign="center">Sign in to Textile Factory</Heading>
                    <Input placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} required/>
                    <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required/>
                    <Button type="submit" colorPalette="blue" color="white" loading={isPending}>Sign In</Button>
                    <Text textAlign="center">
                        Don't have an account?{" "}
                        <Link as={RouterLink} to="/sign-up" color="blue.500" _focus={{ outline: "none" }}>Sign Up</Link>
                    </Text>
                </VStack>
            </form>
        </AuthCard>
    );
}
