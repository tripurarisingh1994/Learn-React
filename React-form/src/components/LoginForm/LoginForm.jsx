import {useState} from 'react';
import styles from './LoginForm.module.css';
import {useEffect} from 'react';

const initialErrorState = {
    required: {
        isRequired: false, msg: ''
    }
}

function LoginForm() {

    const [loginForm, setLoginForm] = useState({email: '', password: ''});

    const [error, setError] = useState({
        email: initialErrorState, password: initialErrorState
    })

    useEffect(() => {
        // console.log(error)
    }, [error]);

    const setErrorState = (field, isRequired, msg) => {
        setError(prevError => ({
            ...prevError,
            [field]: {
                required: {
                    isRequired, msg
                }
            }
        }))
    }

    const onSubmitLoginFormHandler = (event) => {
        event.preventDefault();

        if (handleValidation(loginForm)) {
            console.log(loginForm);
        }
    }

    const handleValidation = (form) => {
        let isValid = false;

        if(!form.email) {
            setErrorState('email', true, 'Email is required.');
        }

        if (!form.password) {
            setErrorState('password', true, 'Password is required.');
        }

        if(form.email) {
            setErrorState('email', false, '');
        }

        if(form.password) {
            setErrorState('password', false, '')
        }

        if (form.email && form.password) {
            isValid = true;
        }

        return isValid;
    }


    return (

        <form className={styles.loginContainer} onSubmit={onSubmitLoginFormHandler}>

            <h3>Login Here</h3>

            <Field id="email" label="Email" setField={setLoginForm} isError={error.email.required.isRequired} errMsg={error.email.required.msg} />
            <Field id="password" label="Password" setField={setLoginForm} isError={error.password.required.isRequired} errMsg={error.password.required.msg} />

            <button className="btn btn-primary">Submit</button>

        </form>)

}

const Field = ({id, label, setField, isError, errMsg}) => (
    <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}</label>
        <input type={id} className="form-control" id={id} onChange={e => setField(form => ({...form, [id]: e.target.value}))}/>
        {isError && <div className="error-text">{errMsg}</div>}
    </div>
);

export default LoginForm;