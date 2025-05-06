import { connect } from "react-redux";
import Footer from "../../components/layout/Footer";
import { changeThemeAction } from "../actions/changeThemeAction";

const mapDispatchToProps = (dispatch) => ({
    saveTheme: (color) => dispatch(changeThemeAction(color))
});

function mapStateToProps(state) {
    return {
        color: state.color.color
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
