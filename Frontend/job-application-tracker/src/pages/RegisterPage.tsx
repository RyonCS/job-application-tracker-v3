import AuthHeader from '../components/AuthHeader';
import AuthForm from '../components/AuthForm';

const registerPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center bg-gray-100 px-4 overflow-hidden">
        <AuthForm 
        title="Register"
        action="/api/v1/auth/register"
        buttonText="Register"
        bottomText="Already have an account?"
        bottomLinkText="Login Here"
        bottomLinkHref="/login"
        />
      </main>
    </div>
  )
}

export default registerPage;
