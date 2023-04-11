import Head from "next/head";
import { Container, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container
          maxWidth="md"
          sx={{ textAlign: "center", marginTop: "10rem", marginBottom: "6rem" }}
        >
          <Typography variant="h1" fontSize="3rem" fontWeight="bold">
            Be the first to speak to new business owners with our{" "}
            <span style={{ display: "inline-block" }}>direct mail service</span>
          </Typography>
          <Button
            variant="outlined"
            sx={{
              marginTop: "3rem",
              padding: "0.8rem 2rem",
              fontSize: "1.2rem",
            }}
          >
            Join our free trial
          </Button>
        </Container>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            textAlign="center"
            marginBottom="3rem"
          >
            Why use us?
          </Typography>
          <p>
            You know how important it is to be first to your customers. But it’s
            really hard to do that when your customer is a new business owner.{" "}
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
            can’t rely on email or phone number as they won’t be usually
            publicly available for a newly-formed business.
          </p>
          <p>
            That’s where our direct mail service comes in. All you need to do
            is:
          </p>
          <ul>
            <li>
              tell us the industry and geographic location of your ideal
              customer
            </li>
            <li>provide us with the copy of your direct mail</li>
            <li>pay for the number of letters you wish to send</li>
          </ul>
          <p>And that’s it! We’ll do the mailing for you.</p>
        </Container>
        <p>Interested? Get in touch!</p>
      </main>
    </>
  );
}
