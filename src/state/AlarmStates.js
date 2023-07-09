import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState} = createGlobalState({
    created: false,
    updated: false,
}) 

export {useGlobalState, setGlobalState};