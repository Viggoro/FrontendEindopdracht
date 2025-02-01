import './FormBox.css';

const FormBox = ({ title, children }) => {
    return (
        <div className="box-container">
            <h1 className="box-title">{title}</h1>
            {children}
        </div>
    );
};

export default FormBox;