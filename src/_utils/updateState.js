export const updateState = (previousState, updatedState) => {
    return {
        ...previousState,
        ...updatedState
    };
};
