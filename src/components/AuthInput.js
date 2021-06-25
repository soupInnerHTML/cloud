import React from "react"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function AuthInput({ layout, field, }) {
    return (
        <Grid item {...layout}>
            <TextField
                {...field}
                required
                variant="outlined"
            />
        </Grid>
    )
}
