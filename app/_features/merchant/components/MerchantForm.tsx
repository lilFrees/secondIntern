import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const authSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  brand: z.string().min(1, "Company name is required"),
  about: z.string().min(1, "Company description is required"),
});

type MerchantFormState = z.infer<typeof authSchema>;

function MerchantForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MerchantFormState>({
    resolver: zodResolver(authSchema),
  });

  return (
    <form>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel>First name</FormLabel>
        <Input {...register("name")} placeholder="Full name" />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input {...register("email")} placeholder="Email" />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.brand}>
        <FormLabel>Company name</FormLabel>
        <Input {...register("brand")} placeholder="Your Company Brand" />
        <FormErrorMessage>{errors?.brand?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.about}>
        <FormLabel>Tell us about your company</FormLabel>
        <Textarea
          {...register("about")}
          placeholder="Brief description of a company"
        ></Textarea>
        <FormErrorMessage>{errors?.about?.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="green" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default MerchantForm;
