/**
 * Simmple example of how react-hook-form and zod is implemented
 */

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }), // Required field validation
  email: z
    .string()
    .email({ message: "Invalid email address" }) // Email format validation
    .regex(/@example\.com$/, { message: "Email must be from example.com" }), // Custom regex-based validation
  age: z
    .number()
    .min(18, { message: "Age must be at least 18" }) // Range check for age
    .max(100, { message: "Age must be less than or equal to 100" }), // Range check for age
});

type FormData = z.infer<typeof schema>;

const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register("age")} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
