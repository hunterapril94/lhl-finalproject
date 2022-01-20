import { Grid } from "@mui/material"
import theme from "../components/styles"

export default function Confirmation() {
  return <Grid color={theme.palette.primary.main} container justifyContent='space-around'><h1>Your items have been requested! Check your phone for status updates!</h1></Grid>
}