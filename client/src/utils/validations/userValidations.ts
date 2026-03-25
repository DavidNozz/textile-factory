import { PASSWORD_REGEX, PERSONAL_ID_REGEX, USERNAME_REGEX } from "@/constants";
import { toast } from "react-toastify";

export function validate(form: any) {
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
