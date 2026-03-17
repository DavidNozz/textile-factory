import { AuthCard } from "@/components";
import { Button, Heading, Input, Text, Link, VStack, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useState, type SubmitEvent } from "react";

export default function SignIn() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
    }

    return (
        <AuthCard>
            <form onSubmit={handleSubmit}>
                <VStack gap={4} align="stretch">
                    <Image src={logo} boxSize="90px" mx="auto"/>
                    <Heading size="lg" textAlign="center">Sign in to Textile Factory</Heading>
                    <Input placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} required/>
                    <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required/>
                    <Button type="submit" colorPalette="blue" color="white">Sign In</Button>
                    <Text textAlign="center">
                        Don't have an account?{" "}
                        <Link as={RouterLink} to="/sign-up" color="blue.500" _focus={{ outline: "none" }}>Sign Up</Link>
                    </Text>
                </VStack>
            </form>
        </AuthCard>
    );
}
