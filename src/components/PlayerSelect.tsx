import React from "react";
import Autocomplete, {AutocompleteRenderInputParams, createFilterOptions} from "@mui/material/Autocomplete";
import IPlayer from "../models/IPlayer";
import {Button, CircularProgress, FilterOptionsState, Stack, TextField} from "@mui/material";
import AddNewPlayerDialog from "../dialogs/AddNewPlayerDialog";

export type PlayerSelectProps = {
    onPlayerAdd: (player: IPlayer | null) => void;
    onNewPlayerCreate: (name: string) => Promise<IPlayer | null>;
    players: IPlayer[];
    loading: boolean;
};

const PlayerSelect: React.FC<PlayerSelectProps> = (props: PlayerSelectProps) => {
    const [openAddNewPlayerDlg, toggleOpenAddNewPlayerDlg] = React.useState(false);
    const [newPlayerName, setNewPlayerName] = React.useState("");
    const [value, setValue] = React.useState<IPlayer | null>(null);

    const onChange = (_event: React.SyntheticEvent<Element, Event>, newValue: string | IPlayer | null) => {
        if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
                setNewPlayerName(newValue);
                toggleOpenAddNewPlayerDlg(true);
            });
        } else if (newValue && newValue.id && newValue.id === -1) {
            setTimeout(() => {
                setNewPlayerName(newValue.name);
                toggleOpenAddNewPlayerDlg(true);
            });
        } else {
            setValue(newValue);
        }
    };

    const filterOptions = (options: IPlayer[], params: FilterOptionsState<IPlayer>) => {
        const filtered = filter(options, params);
        const {inputValue} = params;
        const isExisting = options.some((option) => inputValue === option.name);

        if (inputValue !== "" && !isExisting) {
            filtered.push({
                id: -1,
                name: params.inputValue,
            });
        }

        return filtered;
    };

    const filter = createFilterOptions<IPlayer>();

    const getOptionLabel = (option: string | IPlayer) => {
        if (typeof option === "string") {
            return option;
        }

        if (option.id === -1) {
            return `New | "${option.name}"`;
        }

        return option.name;
    };
    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            label="select or add new player"
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <React.Fragment>
                        {props.loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                ),
            }}
        />
    );

    const autocompleteStyle = {
        width: "100%",
    };

    const onAddClick = () => {
        props.onPlayerAdd(value);
        setValue(null);
    };

    const onAddNewPlayerSubmit = async (value: string) => {
        const player = await props.onNewPlayerCreate(value);
        if (player) {
            setValue(player);
        }
    };

    const autocompleteProps = {
        sx: autocompleteStyle,
        value: value,
        onChange: onChange,
        filterOptions: filterOptions,
        id: "player-autocomplete",
        disabled: props.loading,
        loading: props.loading,
        options: props.players ? props.players : [],
        getOptionLabel: getOptionLabel,
        selectOnFocus: true,
        clearOnBlur: true,
        handleHomeEndKeys: true,
        freeSolo: true,
        renderInput: renderInput,
    };

    return (
        <React.Fragment>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Autocomplete {...autocompleteProps} size="small" />
                    <Button variant="contained" size="small" onClick={onAddClick} disabled={value == undefined}>
                        Add
                    </Button>
                </Stack>
            </Stack>
            <AddNewPlayerDialog
                isOpen={openAddNewPlayerDlg}
                initialValue={newPlayerName}
                onSubmit={onAddNewPlayerSubmit}
                onClose={() => toggleOpenAddNewPlayerDlg(false)}
            ></AddNewPlayerDialog>
        </React.Fragment>
    );
};

export default PlayerSelect;
