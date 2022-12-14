import React, { useState } from "react";
import "../App.css";
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
  Title,
  MantineProvider,
  ActionIcon,
  ColorSchemeProvider,
  ColorScheme,
  useMantineColorScheme,
  UnstyledButton,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Link, useLocation } from "react-router-dom";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconMoonStars, IconSun, IconX } from "@tabler/icons";
import { useUserStore } from "../stores/userStore";
import { useGetUser } from "../api/getUser";
import { signUp, logIn, logOut } from "../api/booksApi";
const NavbarP = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const username = useUserStore((state) => state.username);
  const changeUser = useUserStore((state) => state.changeUser);
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
      showNotification({
        id: "load-data",
        loading: true,
        title: "Signing up",
        message: "Wait for process to finish",
        autoClose: false,
        disallowClose: true,
      });
      const rawResponse = await signUp(formData);
      const response = await rawResponse.json();
      if (rawResponse.status < 400) {
        setShow(false);
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Signed up succesfully",
          message: "Log in to create blog or to comment!",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
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
    const rawResponse = await logIn(formDataLogin);
    if (rawResponse.status === 200) {
      const resp = await rawResponse.json();
      changeUser(resp.username, resp._id);
      setShowLogin(false);
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Logged in succesfully",
        message: "Now you can comment or create blogs.",
        icon: <IconCheck size={16} />,
        autoClose: 2000,
      });
      setFormDataLogin({
        username: "",
        password: "",
      });
    } else {
      updateNotification({
        id: "load-data",
        color: "red",
        title: "Failed to log in",
        message: "Wrong username or password",
        icon: <IconX size={16} />,
        autoClose: 2000,
      });
    }
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
  async function handleLogout() {
    const resp = await logOut();
    window.location.reload();
  }
  useGetUser();

  let location = useLocation();
  return (
    <>
      <Group position="apart">
        <UnstyledButton id="unstyled" component={Link} to="/">
          <Title order={1}>
            <Text
              variant="gradient"
              gradient={
                username
                  ? { from: "orange", to: "red" }
                  : { from: "blue", to: "indigo" }
              }
            >
              {username || "Blogs app"}
            </Text>
          </Title>
        </UnstyledButton>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {!username ? (
            <>
              <Button onClick={() => setShow((o) => !o)}>Sign Up</Button>
              <Button onClick={() => setShowLogin((o) => !o)}>Log In</Button>
            </>
          ) : (
            <>
              {location.pathname === "/create" ? (
                <Button disabled component={Link} to="/create">
                  Create a blog post
                </Button>
              ) : (
                <Button component={Link} to="/create">
                  Create a blog post
                </Button>
              )}
              {location.pathname === "/own" ? (
                <Button disabled component={Link} to="/own">
                  Your blogs
                </Button>
              ) : (
                <Button component={Link} to="/own">
                  Your blogs
                </Button>
              )}
              <Button onClick={() => handleLogout()}>Log out</Button>
            </>
          )}
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
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
        </div>
      </Group>
    </>
  );
};
const Navbar = () => {
  // const colorScheme = useColorStore((state) => state.theme);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <NotificationsProvider>
          <AppShell
            header={
              <Header p="md" height="fit-content" fixed={false}>
                <NavbarP />
              </Header>
            }
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            {/* <div>Navbar</div> */}
            <Outlet />
          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default Navbar;
