import * as React from "react";
import {Stack} from "@mui/material";
import {EndFakeHeader, EndFakePlayer, EndItem} from "./GridItem";
import {blue} from "@mui/material/colors";
import useMedia from "../../hooks/Media";
import {iota} from "../../utility/common";

export type EndColumnProps = {
    ends: number;
    currEnd: number;
    teamSize: number;
    validEnds?: boolean[];
    width: string;
    totalScore?: boolean;
};

const EndColumn: React.FC<EndColumnProps> = (props: EndColumnProps) => {
    const {isSmallScreen} = useMedia();

    return (
        <React.Fragment>
            <Stack sx={{minWidth: "2.5rem", width: props.width}}>
                <Stack
                    sx={{
                        backgroundColor: blue[100],
                        opacity: "1",
                    }}
                >
                    <EndFakeHeader />
                    <Stack direction={isSmallScreen ? "row" : "column"} spacing={0.25} sx={{opacity: "0"}}>
                        {iota(props.teamSize).map((value: number) => (
                            <EndFakePlayer key={`end_fake_player_${value}`} />
                        ))}
                    </Stack>
                </Stack>
                <Stack
                    spacing={0.5}
                    sx={{
                        height: "100%",
                        backgroundColor: "#fff",
                    }}
                >
                    {/* <EndItem key={`end_item_0}`} end={0} /> */}
                    {iota(props.ends - 1).map((value: number) => {
                        const end = value + 1;
                        return (
                            <EndItem
                                key={`end_item_${end}`}
                                end={end}
                                highlight={end === props.currEnd}
                                invalid={props.validEnds && !props.validEnds[end] && end <= props.currEnd}
                            />
                        );
                    })}
                    {props.totalScore && <EndItem end="TOT" />}
                </Stack>
            </Stack>
        </React.Fragment>
    );
};

export default EndColumn;
