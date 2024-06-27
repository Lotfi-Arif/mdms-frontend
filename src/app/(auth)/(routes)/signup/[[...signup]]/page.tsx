"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";

export default function AdditionalDetailsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [formData, setFormData] = useState({
    clerkId: "",
    email: "",
    firstName: "",
    lastName: "",
    universityId: "",
    role: "",
  });

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData((prevState) => ({
        ...prevState,
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName || "",
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // create a new user in clerk
    const newClerkUser = await clerkClient.users.createUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: [formData.email],
      publicMetadata: {
        universityId: formData.universityId,
        role: formData.role,
      },
    });

    console.log(newClerkUser);

    // create a new user in the backend
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`, formData)
      .then((response) => {
        alert("User created successfully: " + response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        alert("Error creating user: " + error.message);
      });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isSignedIn && !user ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            placeholder="Email"
          />
          <input
            type="text"
            name="firstName "
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="universityId"
            value={formData.universityId}
            onChange={handleChange}
            placeholder="University ID"
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
          />
          <button type="submit">Register</button>
        </form>
      ) : (
        <div>Already registered</div>
      )}
    </>
  );
}
