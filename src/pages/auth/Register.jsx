import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuthHook } from '../../hooks/useAuth.js'
import AuthLayout from '../../layouts/AuthLayout.jsx'

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  name: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  role: Yup.string()
    .required('Please select a role')
    .oneOf(['tourist', 'host', 'driver'], 'Invalid role selected'),
})

const Register = () => {
  const { register } = useAuthHook()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError('')
    try {
      await register(values)
      // Redirect to appropriate dashboard based on role
      if (values.role === 'tourist') navigate('/tourist/dashboard')
      else if (values.role === 'host') navigate('/host/dashboard')
      else if (values.role === 'driver') navigate('/driver/dashboard')
      else navigate('/')
    } catch (error) {
      setServerError(error.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          role: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form className="mt-8 space-y-6">
            {serverError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{serverError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.email && touched.email
                      ? 'border-red-300'
                      : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.password && touched.password
                      ? 'border-red-300'
                      : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.confirmPassword && touched.confirmPassword
                      ? 'border-red-300'
                      : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.name && touched.name
                      ? 'border-red-300'
                      : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  I want to join as: *
                </label>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['tourist', 'host', 'driver'].map((role) => (
                    <div key={role} className="relative">
                      <Field
                        type="radio"
                        id={`role-${role}`}
                        name="role"
                        value={role}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`role-${role}`}
                        className={`cursor-pointer flex items-center justify-center px-4 py-3 border rounded-lg ${
                          values.role === role
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm font-medium capitalize">
                          {role === 'tourist' ? 'Traveler' : 
                           role === 'host' ? 'Accommodation Host' : 'Transport Driver'}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  )
}

export default Register