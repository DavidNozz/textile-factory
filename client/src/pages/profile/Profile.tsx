import { AuthCard } from "@/components";
import { useUpdateProfile } from "@/hooks/user";
import { Gender } from "@/types/user";
import { getCurrentUser, setCurrentUser } from "@/utils/storage/authStorage";
import { validate } from "@/utils/validations/userValidations";
import { Button, Heading, Input, NativeSelect, Text, VStack } from "@chakra-ui/react";
import { useState, type SubmitEvent } from "react";
import { toast } from "react-toastify";

export default function Profile() {
    const user = getCurrentUser();
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const [form, setForm] = useState({
        personalId: user?.personalId,
        name: user?.name,
        username: user?.username,
        password: user?.password,
        gender: user?.gender,
        dob: user?.dob.split("T")[0],
    });

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        if (!validate(form)) {
            return;
        }

        updateProfile(
            {
                _id: user?.id as string,
                payload: {
                    personalId: form.personalId as string,
                    name: form.name as string,
                    username: form.username as string,
                    password: form.password as string,
                    gender: form.gender as Gender,
                    dob: form.dob as string,
                },
            },
            {
                onSuccess: (data) => {
                    setCurrentUser(data);
                    toast.success("Profile updated successfully");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            },
        );
    }

    return (
        <AuthCard>
            <form onSubmit={handleSubmit}>
                <VStack gap={4} align="stretch">
                    <Heading size="lg" textAlign="center">Profile</Heading>
                    <Text textAlign="center" color="gray.500">Update your personal details</Text>
                    <Input placeholder="Personal ID" value={form.personalId} onChange={(e) => setForm({...form, personalId: e.target.value})} required/>
                    <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required/>
                    <Input placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} required/>
                    <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required/>
                    <NativeSelect.Root>
                        <NativeSelect.Field value={form.gender} onChange={(e) => setForm({...form, gender: e.target.value as Gender})}>
                            {Object.values(Gender).map((genderValue) => (
                                <option key={genderValue} value={genderValue}>{genderValue}</option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator/>
                    </NativeSelect.Root>
                    <Input placeholder="Date of Birth" type="date" value={form.dob} onChange={(e) => setForm({...form, dob: e.target.value})} required/>
                    <Button type="submit" colorPalette="blue" color="white" loading={isPending}>Save Changes</Button>
                </VStack>
            </form>
        </AuthCard>
    );
}
