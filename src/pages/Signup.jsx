import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './Pages.css'

const nameRegex = /^[A-Za-z ]{2,}$/;
const usernameRegex = /^[A-Za-z0-9._-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, 'Name must be at least 2 characters and contain only letters and spaces.')
    .required('Full name is required'),
  username: Yup.string()
    .matches(usernameRegex, 'Username can only contain letters, numbers, dots, underscores, and hyphens.')
    .required('Username is required'),
  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address.')
    .required('Email is required'),
  password: Yup.string()
    .matches(passwordRegex, 'Password must be 8-16 characters with at least one lowercase, one uppercase, one digit, and one special character.')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match.')
    .required('Please confirm your password'),
});

function Signup() {
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    localStorage.setItem('userData', JSON.stringify({
      name: values.name,
      username: values.username,
      email: values.email,
    }))

    useNavigate('/success')
  }

  return (
    <Formik
      initialValues={{ name: '', username: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => (
        <div className="page-container">
          <div className="form-container">
            <h1>Create Account</h1>
            <Form className="signup-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                />
                <ErrorMessage name="name" component="span" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                />
                <ErrorMessage name="username" component="span" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="span" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
                <ErrorMessage name="confirmPassword" component="span" className="error" />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={!isValid}
              >
                Sign Up
              </button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Signup
