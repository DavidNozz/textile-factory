import { AuthCard } from "@/components";
import { Button, Heading, Input, NativeSelect, Text, Link, VStack, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useState, type SubmitEvent } from "react";
import { toast } from "react-toastify";
import { PASSWORD_REGEX, PERSONAL_ID_REGEX, USERNAME_REGEX } from "@/constants";

export default function SignUp() {
    const [form, setForm] = useState({
        personalId: "",
        name: "",
        username: "",
        password: "",
        role: "Employee",
        dob: "",
        isBlocked: false,
        managerId: "",
    });

    function validate() {
        if (!PERSONAL_ID_REGEX.test(form.personalId)) {
            toast.error("Personal ID must be exactly 9 digits");
            return false;
        }

        if (!USERNAME_REGEX.test(form.username)) {
            toast.error("Username must contain only letters");
            return false;
        }

        if (!PASSWORD_REGEX.test(form.password)) {
            toast.error("Password must include uppercase, lowercase, digit and no spaces");
            return false;
        }

        if (form.dob) {
            const today = new Date();
            const birthDate = new Date(form.dob);

            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();

            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age -= 1;
            }

            if (age < 18) {
                toast.error("You must be at least 18 years old");
                return false;
            }
        }

        return true;
    }

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (!validate()) return;
        toast.success("Account created successfully");
    }

    return (
        <AuthCard>
            <form onSubmit={handleSubmit}>
                <VStack gap={4} align="stretch">
                    <Image src={logo} boxSize="90px" mx="auto"/>
                    <Heading size="lg" textAlign="center">Get started with Textile Factory</Heading>
                    <Input placeholder="Personal ID" value={form.personalId} onChange={(e) => setForm({...form, personalId: e.target.value})} required/>
                    <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required/>
                    <Input placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} required/>
                    <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required/>
                    <NativeSelect.Root>
                        <NativeSelect.Field value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="CEO">CEO</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator/>
                    </NativeSelect.Root>
                    <Input placeholder="Date of Birth" type="date" value={form.dob} onChange={(e) => setForm({...form, dob: e.target.value})} required/>
                    <Button type="submit" colorPalette="blue" color="white">Sign Up</Button>
                    <Text textAlign="center">
                        Already have an account?{" "}
                        <Link as={RouterLink} to="/sign-in" color="blue.500" _focus={{ outline: "none" }}>Sign In</Link>
                    </Text>
                </VStack>
            </form>
        </AuthCard>
    );
}
