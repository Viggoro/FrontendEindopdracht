import './Sidebar.css';

function SideBar(props) {
    return (
        <div id={props.title} className="sidebar-container">
            {props.children}
        </div>
    );
}

export default SideBar;