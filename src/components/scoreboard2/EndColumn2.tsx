import * as React from "react";
import {Stack, Box} from "@mui/material";
import {EndItem2} from "./GridItem2";
import {blue} from "@mui/material/colors";
import {iota} from "../../utility/common";

export type EndColumnProps2 = {
    ends: number;
};

const EndColumn2: React.FC<EndColumnProps2> = (props: EndColumnProps2) => {
    return (
        <Box
            sx={{
                // paddingRight: `${theme.spacing(0.25)}`,
                // paddingLeft: `${theme.spacing(0.25)}`,
                // height: "100%",
                backgroundColor: blue[200],
                minWidth: "2.5rem",
                width: "30%",
                height: "auto",
            }}
        >
            <Stack spacing={0.25} sx={{height: "100%", width: "100%"}}>
                <EndItem2 key={`end_item_0}`} text="H" />
                {iota(props.ends - 1).map((value: number) => (
                    <EndItem2 key={`end_item_${value + 1}`} text={(value + 1).toString()} />
                ))}
            </Stack>
        </Box>
    );
};

export default EndColumn2;
