import { Button, Card as MuiCard, CardHeader, Grid, IconButton, Popover } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from "@material-ui/icons/MoreVert"

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    card: {
        marginTop: "1em",
    },
    cardHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    articleMenu: {
        display: "flex",
        flexDirection: "column",
        width: "max-content"
    },
    articleButton: {
        marginTop: "1em",
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function CustomCard({ row, onEdit, component }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <MuiCard className={classes.card}>
            <CardHeader
                title={row.name}
                subheader={"Gemüse"}
                titleTypographyProps={{
                    variant: "h6"
                }
                }
                action={
                    <>
                        <IconButton aria-label="settings" aria-describedby={id} onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}

                        >
                            <Grid container direction="column" alignItems="flex-start" justify="space-around" spacing={1}>
                                <Grid item>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        className={classes.button}
                                        startIcon={<EditIcon />}
                                    >
                                        Bearbeiten
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        fullWidth
                                        color="secondary"
                                        variant="contained"
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Löschen
                                    </Button>
                                </Grid>
                            </Grid>
                        </Popover>
                    </>
                }
            >
            </CardHeader>
        </MuiCard >
    )
}

