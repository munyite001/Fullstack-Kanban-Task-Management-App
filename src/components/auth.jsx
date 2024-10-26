 /* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';
import AlertMessage from './Alert';
import axios from 'axios';

export default function Auth({ theme }) {

    const [showAlert, setShowAlert] = useState(false);

    const [alertMessage, setAlertMessage] = useState({
        message: "",
        type: "",
    });

    // Refs for the elements
    const signUpButtonRef = useRef(null);
    const signInButtonRef = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {
        // Add event listeners
        const handleSignUpClick = () => {
            mainRef.current.classList.add('right-panel-active');
        };

        const handleSignInClick = () => {
            mainRef.current.classList.remove('right-panel-active');
        };

        const signUpButton = signUpButtonRef.current;
        const signInButton = signInButtonRef.current;

        signUpButton.addEventListener('click', handleSignUpClick);
        signInButton.addEventListener('click', handleSignInClick);

        // Cleanup event listeners on component unmount
        return () => {
            signUpButton.removeEventListener('click', handleSignUpClick);
            signInButton.removeEventListener('click', handleSignInClick);
        };
    }, []);

    const containerStyles = theme === 'dark' ? {
        background: "#2b2c37",
        color: "#f5f5f5"
    } : {
        background: "#f5f5f5",
        color: "#20212c"
    };	

    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleRegisterUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/users/register", registerForm);
            setAlertMessage({message: response.data.message, type: "success"});
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }
            , 5000);
        } catch (error) {
            console.log("Error is: ", error);
            if (error.response && error.response.status == 401) {
                setAlertMessage({message: error.response.data.message, type: "error"});
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            } else if (error.response && error.response.status == 402) {
                setAlertMessage({message: error.response.data.message, type: "error"});
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            } else {
                setAlertMessage({message: error.data.message, type: "error"});
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            }
        }

    }

    return (
        <div className="auth" style={containerStyles}>
            {showAlert && <AlertMessage message={alertMessage.message} type={alertMessage.type} />}
            <div className="auth-container" id="main" ref={mainRef} style={containerStyles}>
                <div className="sign-up">
                    <form action="#" style={containerStyles} onSubmit={(e) => handleRegisterUser(e)}>
                        <h1>Create account</h1>
                        <div className="social-container">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <p>Or use your email for registration</p>

                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={registerForm.username}
                            onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                            required />

                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                            required />
                        
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                            required />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="sign-in">
                    <form action="#" style={containerStyles}>
                        <h1>Sign In</h1>
                        <div className="social-container">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <p>Or login using your account</p>
                        <input type="email" name="txt" placeholder="Email" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <a href="#">Forget Your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-left">
                            <h1>Welcome Back</h1>
                            <p>To keep connected with us, please login with your personal info</p>
                            <button id="signIn" ref={signInButtonRef}>Sign In</button>
                        </div>
                        <div className="overlay-right">
                            <h1>Hello, Friend</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button id="signUp" ref={signUpButtonRef}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
