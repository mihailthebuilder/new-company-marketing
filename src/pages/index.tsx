import Head from "next/head";
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Link,
  Box,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Oswald } from "next/font/google";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

const oswald = Oswald({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>CompanyHound</title>
        <meta
          name="description"
          content="Be the first to speak to new business owners with CompanyHound's direct mail service"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <NavBar />
        <Container
          maxWidth="md"
          sx={{
            textAlign: "center",
            marginTop: {
              md: "10rem",
              xs: "4rem",
            },
            marginBottom: {
              md: "3rem",
              xs: "2rem",
            },
          }}
        >
          <Typography
            variant="h1"
            fontSize={{ md: "3rem", xs: "1.7rem" }}
            fontWeight="bold"
          >
            Be the{" "}
            <Box component="span" color="secondary.main">
              first
            </Box>{" "}
            to speak to new business owners with our{" "}
            <Box component="span" display="inline-block" color="secondary.main">
              postal mail service
            </Box>
          </Typography>
        </Container>
        <Container maxWidth="sm" id="signup" sx={{ textAlign: "center" }}>
          <EnquiryForm />
        </Container>
        <Container
          maxWidth="sm"
          sx={{ marginBottom: "4rem", marginTop: "5rem" }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            marginBottom={{ md: "3rem", xs: "2rem" }}
            fontSize={{ md: "2.5rem", xs: "1.5rem" }}
          >
            Why use us?
          </Typography>
          <p>
            You know how important it is to be first to your customers. But
            it&apos;s really hard to do that when your customer is a new
            business owner!{" "}
          </p>
          <p>
            There are millions of companies in the UK. You need to regularly go
            through all of them to find out which have been recently
            incorporated.
          </p>
          <p>
            Of the tens of thousands of companies you may find, you then have to
            filter for those that match your ideal customer profile.
          </p>
          <p>
            Finally, you need to figure out a way to grab their attention. You
            can&apos;t rely on email or phone number as they won&apos;t be
            usually publicly available for a newly-formed business.
          </p>
          <p>
            That&apos;s where our direct mail service comes in. All you need to
            do is:
          </p>
          <ul style={{ paddingLeft: "1rem" }}>
            <li>
              tell us the industry and geographic location of your ideal
              customer
            </li>
            <li>provide us with the copy of your direct mail</li>
            <li>pay for the number of letters you wish to send</li>
          </ul>
          <p>And that&apos;s it! We&apos;ll do the mailing for you.</p>
        </Container>
        <Box
          marginTop={{ md: "5rem", xs: 0 }}
          fontSize="0.8rem"
          marginBottom="1.5rem"
          textAlign="center"
        >
          Copyright © Tuxedo Software Limited {new Date().getFullYear()}
        </Box>
      </main>
    </>
  );
}

function NavBar() {
  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            fontWeight="bold"
            className={oswald.className}
            variant="h6"
            color="inherit"
            sx={{
              fontStyle: "italic !important",
              overflow: "inherit !important",
            }}
            flexGrow="1"
            noWrap
          >
            CompanyHound
          </Typography>
          <nav>
            <Link
              underline="none"
              fontWeight="bold"
              color="text.primary"
              href="#signup"
            >
              Contact us
            </Link>
          </nav>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function EnquiryForm() {
  const [emailInput, setEmailInput] = useState("");
  const [messageAfterSubmit, setMessageAfterSubmit] = useState<JSX.Element>();
  const [isLoading, setIsLoading] = useState(false);

  const emailApiUrl = process.env.NEXT_PUBLIC_EMAIL_API_URL
    ? process.env.NEXT_PUBLIC_EMAIL_API_URL
    : "http://localhost:8080/email";

  const handleSubmitEnquiry = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessageAfterSubmit(undefined);

    fetch(emailApiUrl, {
      method: "POST",
      body: JSON.stringify({
        EmailAddress: emailInput,
        Title: "CompanyHound - New Enquiry",
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw Error(
            `error response from API, status ${response.status}, message ${response.statusText}`
          );
        }

        setMessageAfterSubmit(SuccessMessage);
      })
      .catch((err) => {
        setMessageAfterSubmit(ErrorMessage);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (messageAfterSubmit) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        {messageAfterSubmit}
      </Box>
    );
  }

  return (
    <>
      <Box textAlign="center" fontSize={{ md: "1.3rem", xs: "1.1rem" }}>
        <p>
          We&apos;re running a free trial with a limited number of users. Enter
          your email below to join the waitlist:
        </p>
      </Box>
      <Grid
        component="form"
        container
        spacing={2}
        marginTop="1.5rem"
        onSubmit={handleSubmitEnquiry}
      >
        <Grid md={8} xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
          />
        </Grid>
        <Grid md={4} xs={12}>
          <Button
            fullWidth
            sx={{
              height: "100%",
              fontSize: "1.3rem",
              ":hover": { bgcolor: "#FEBE5D" },
            }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

const ErrorMessage = (
  <Alert
    severity="error"
    sx={{
      marginTop: "2rem",
    }}
  >
    Unable to submit enquiry at the moment.
  </Alert>
);

const SuccessMessage = (
  <Alert severity="success">
    Thanks for reaching out! We&apos;ll get back to you ASAP.
  </Alert>
);
