import { TextField, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function EnquiryForm() {
  return (
    <Grid component="form" container spacing={2}>
      <Grid md={8} xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid md={4} xs={12}>
        <Button variant="contained">Submit</Button>
      </Grid>
    </Grid>
  );
}
