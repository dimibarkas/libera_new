import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { retriveArticleList } from '../../services/article-service';

export default function AsynchronousAutocompleteArticles({ value, handleChange, token, name }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const res = await retriveArticleList("/api/articles/all", token);
            if (active) {
                setOptions(res);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, token]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            name={name}
            value={value}
            onChange={(event, newValue) => handleChange(newValue)}
            fullWidth
            id="articles"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={() => true}
            getOptionLabel={(option) => {
                if (option.hasOwnProperty('name')) {
                    return option.name;
                }
                return option;
            }}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    fullWidth
                    {...params}
                    name={name}
                    label="Artikel"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}