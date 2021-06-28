import { observer } from "mobx-react-lite";
import auth from "../mobx/auth";
import { Snackbar, Avatar, Button, CssBaseline, Link, Grid, Typography, Container, Zoom, Slide } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import AuthInput from "../components/AuthInput"
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatarPrimary: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    avatarSecondary: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    google: {
        margin: theme.spacing(0, 0, 2),
        background: theme.palette.background.paper,
    },
}));

const layouts = {
    half: {
        xs: 12,
        sm: 6,
    },
    full: {
        xs: 12,
    },
}

const fields = {
    signUp: [{
        id: "1",
        name: "email",
        label: "Email Address",
        layout: layouts.full,
        fullWidth: true,
    },
    {
        id: "2",
        name: "password",
        label: "Password",
        layout: layouts.full,
        fullWidth: true,
        type: "password",
    }],
    signIn: [{
        id: "3",
        name: "email",
        label: "Email Address",
        layout: layouts.full,
        autoFocus: true,
        fullWidth: true,
    },
    {
        id: "4",
        name: "password",
        label: "Password",
        type: "password",
        layout: layouts.full,
        fullWidth: true,
    }],
}


const Auth = () => {
    const classes = useStyles()
    const _auth = ["signUp", "signIn"]
    const authNiceNames = ["Sign up", "Sign in"]
    const [authType, setAuthType] = useState(1)
    const [zoomEffect, setZoomEffect] = useState(true)
    const [error, setError] = useState(null)
    const [isFetching, setIsFetching] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const Transition = useMemo(() => (isFirstRender ? Zoom : Slide), [isFirstRender])

    const buttonHandler = (asyncFn) => async (event) => {
        try {
            setIsFetching(true)
            await asyncFn(event)
        }
        catch (e) {
            setError(e.toString())
        }
        finally {
            setIsFetching(false)
        }
    }

    const authUser = async (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
        await auth[_auth[authType]](formData)
    }

    const switchAuthType = () => {
        setIsFirstRender(false)
        setZoomEffect(false)

        // +!authType === switch to different authType
        setTimeout(() => setAuthType(+!authType), 150)
        setTimeout(() => setZoomEffect(true), 300)
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Snackbar open={error}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>

            <Transition direction={zoomEffect ? "left" : "right"} in={zoomEffect}>
                <div className={classes.paper}>
                    <Avatar className={authType ? classes.avatarPrimary : classes.avatarSecondary}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        {authNiceNames[authType]}
                    </Typography>

                    <form className={classes.form} onSubmit={buttonHandler(authUser)} method={"POST"}>
                        <Grid container spacing={2}>
                            {
                                fields[_auth[authType]].map(({ layout, ...field }) => (
                                    <AuthInput {...{ field, layout, }} key={field.id} />
                                ))
                            }
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color={authType ? "primary" : "secondary"}
                            className={classes.submit}
                            disabled={isFetching}
                        >
                            {authNiceNames[authType]}
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            className={classes.google}
                            onClick={buttonHandler(auth.googleSignIn)}
                            disabled={isFetching}
                        >
                        Google sign in
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" onClick={switchAuthType}>
                                    {/*
                                    Already have an account? Sign in
                                    or
                                    Don't have an account? Sign Up
                                */}
                                    {authType ? "Don't" : "Already"}
                                &nbsp;have an account?&nbsp;
                                    {authNiceNames[+!authType]}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Transition>
        </Container>
    );
};

export default observer(Auth);
