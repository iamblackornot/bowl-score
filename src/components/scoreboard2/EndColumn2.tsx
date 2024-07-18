import * as React from "react";
import {Stack, Box} from "@mui/material";
import {EndItem2} from "./GridItem2";
import {blue} from "@mui/material/colors";

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
                {[...Array(props.ends).keys()].map((value: number) => (
                    <EndItem2 key={`end_item_${value}`} text={value.toString()} />
                ))}
            </Stack>
        </Box>
    );
};

export default EndColumn2;

// export const EndColumn2: React.FC<EndColumnProps> = (props: EndColumnProps) => {
//     const {isSmallScreen} = useMedia();

//     return (
//         <React.Fragment>
//             <Stack sx={{backgroundColor: blue[100], opacity: "1", minWidth: "2.5rem"}}>
//                 {/* <EndFakeHeader /> */}
//                 <TeamHeader text="●" />

//                 <Grid container spacing={0.25} sx={{opacity: "1"}}>
//                     <Grid key={`end_fake_player_item_${0}`} xs={isSmallScreen ? Math.floor(12 / props.teamSize) : 12}>
//                         <PlayerItem text="1" />
//                     </Grid>
//                     <Grid key={`end_fake_player_item_${1}`} xs={isSmallScreen ? Math.floor(12 / props.teamSize) : 12}>
//                         <PlayerItem text="1" />
//                     </Grid>
//                     <Grid key={`end_fake_player_item_${2}`} xs={isSmallScreen ? Math.floor(12 / props.teamSize) : 12}>
//                         <PlayerItem text="1" />
//                     </Grid>
//                 </Grid>
//             </Stack>
//         </React.Fragment>
//     );
// };

// <Box
// sx={{
//     // height: "100%",
//     display: "flex",
//     flexDirection: "column",
//     minWidth: {
//         xs: "100px",
//     },
//     maxWidth: {
//         // xs: "100%",
//         xs: "300px",
//     },
// }}
// ></Box>

{
    /* <Grid container spacing={0.25} sx={{opacity: "1"}}>
{[...Array(props.teamSize).keys()].map((value: number) => (
    <Grid
        key={`end_fake_player_item_${value}`}
        xs={isSmallScreen ? Math.floor(12 / props.teamSize) : 12}
    >
        <PlayerItem text="1" />
    </Grid>
))}
</Grid> */
}
