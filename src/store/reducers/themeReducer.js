let initialState = {
    color: "#FFFFFF"
};

export default function themeReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_THEME":
            console.log('themeReducer' + JSON.stringify(state));
            return {
                ...state,
                color: action.payload
            };
        default:
            return state;
    }
}

