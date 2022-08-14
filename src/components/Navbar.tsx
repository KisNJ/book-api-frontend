import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AppShell,
  Text,
  Header,
  Button,
  Group,
  Modal,
  TextInput,
  Alert,
} from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { updateNamedExports } from "typescript";

const NavbarP = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({ type: "", text: "" });
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError((o) => ({
        type: "password matching",
        text: "Password and confirm password are not the same!",
      }));
    } else {
      const rawResponse = await fetch("http://localhost:3100/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(rawResponse.status);
      // const content = await rawResponse.json();
      // console.log(content);
    }
  }
  function dataChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((old) => ({
      ...old,
      [e.target.id]: e.target.value,
    }));
  }
  return (
    <>
      <Group>
        <Text>Navbar</Text>
        <Button onClick={() => setShow((o) => !o)}>Sign Up</Button>
        <Modal
          opened={show}
          onClose={() => setShow(false)}
          title="Introduce yourself!"
        >
          <form onSubmit={handleSubmit}>
            <TextInput
              placeholder="username"
              label="Username"
              required
              minLength={1}
              id="username"
              onChange={dataChange}
              value={formData.username}
            />
            <TextInput
              placeholder="passowrd"
              label="Password"
              error={
                error.type === "password matching"
                  ? "passwords are not matching"
                  : ""
              }
              required
              id="password"
              onChange={dataChange}
              value={formData.password}
            />
            <TextInput
              placeholder="confirm password"
              label="Confirm Password"
              error={
                error.type === "password matching"
                  ? "passwords are not matching"
                  : ""
              }
              required
              id="confirmPassword"
              onChange={dataChange}
              value={formData.confirmPassword}
            />
            <Button mt="md" type="submit">
              Sign Up
            </Button>
          </form>
          {error.type && (
            <Alert
              mt="md"
              withCloseButton
              closeButtonLabel="Close alert"
              title="Error!"
              color="red"
              onClose={() => setError({ type: "", text: "" })}
            >
              {error.text}
            </Alert>
          )}
        </Modal>
      </Group>
    </>
  );
};
const Navbar = () => {
  return (
    <AppShell
      header={
        <Header p="md" height="50">
          <NavbarP />
        </Header>
      }
    >
      {/* <div>Navbar</div> */}
      <Outlet />
    </AppShell>
  );
};

export default Navbar;
