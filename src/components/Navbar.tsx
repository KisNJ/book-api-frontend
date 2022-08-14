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
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

const NavbarP = () => {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formDataLogin, setFormDataLogin] = useState({
    username: "",
    password: "",
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
      setShow(false);
      showNotification({
        id: "load-data",
        loading: true,
        title: "Signing up",
        message: "Wait for process to finish",
        autoClose: false,
        disallowClose: true,
      });
      const rawResponse = await fetch("http://localhost:3100/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await rawResponse.json();
      if (rawResponse.status < 400) {
        updateNotification({
          id: "load-data",
          color: "blue",
          title: "Signed up succesfully",
          message: "Log in to create blog or to comment!",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      } else {
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Failed to sign up",
          message: response.msg,
          icon: <IconX size={16} />,
          autoClose: 2000,
        });
      }
      setError({
        type: "",
        text: "",
      });
      // const content = await rawResponse.json();
      // console.log(content);
    }
  }
  async function handleSubmitLogin(e: React.SyntheticEvent) {
    e.preventDefault();
    showNotification({
      id: "load-data",
      loading: true,
      title: "Logging up",
      message: "Wait for process to finish",
      autoClose: false,
      disallowClose: true,
    });
    const rawResponse = await fetch("http://localhost:3100/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataLogin),
    });
    const response = await rawResponse.json();
    console.log(response);
  }
  function dataChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((old) => ({
      ...old,
      [e.target.id]: e.target.value,
    }));
  }
  function dataChangeLogin(e: React.ChangeEvent<HTMLInputElement>) {
    setFormDataLogin((old) => ({
      ...old,
      [e.target.id]: e.target.value,
    }));
  }
  return (
    <>
      <Group>
        <Text>Navbar</Text>
        <Button onClick={() => setShow((o) => !o)}>Sign Up</Button>
        <Modal opened={show} onClose={() => setShow(false)} title="Sign up!">
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
        <Button onClick={() => setShowLogin((o) => !o)}>Log In</Button>
        <Modal
          opened={showLogin}
          onClose={() => setShowLogin(false)}
          title="Log In!"
        >
          <form onSubmit={handleSubmitLogin}>
            <TextInput
              placeholder="username"
              label="Username"
              required
              minLength={1}
              id="username"
              onChange={dataChangeLogin}
              value={formDataLogin.username}
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
              onChange={dataChangeLogin}
              value={formDataLogin.password}
            />
            <Button mt="md" type="submit">
              Log in
            </Button>
          </form>
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
