import React from "react";

const RED = "#FF0000";
const BLUE = "#0000FF";
const GRAY = "#678c89";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.handleThemeClick = this.handleThemeClick.bind(this);
    }
    
    handleThemeClick(e) {
        e.preventDefault();
        const color = e.target.value;
        this.submitThemeColor(color);
    }

    submitThemeColor(color) {
        if (color) {
            console.log('submitThemeColor' + color);
            this.props.saveTheme(color);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.color !== this.props.color) {
            console.log('Setting theme color to:', this.props.color);
            document.documentElement.style.setProperty('--main-color', this.props.color);
        }
    }

    render() {
        return (
            <div className="footer">
                <div className="vertical-center">
                    <span>Theme </span>
                    <button onClick={() => this.submitThemeColor(RED)} className="dot red" value={RED}></button>
                    <button onClick={() => this.submitThemeColor(BLUE)} className="dot blue" value={BLUE}></button>
                    <button onClick={() => this.submitThemeColor(GRAY)} className="dot gray" value={GRAY}></button>
                </div>
            </div>
        );
    }
}

export default Footer;
