import {useMediaQuery} from "@mui/material";

const useMedia = () => {
    const isSmallScreen = useMediaQuery("(max-width:420px)");

    return {isSmallScreen};
};

export default useMedia;
