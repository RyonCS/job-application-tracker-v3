import AuthHeader from "../components/AuthFormComponents/AuthHeader";
import AuthForm from "../components/AuthFormComponents/AuthForm";
import Footer from "../components/Footer";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
        <main className="flex-grow flex items-center justify-center bg-gray-100 px-4 overflow-hidden">
          <AuthForm 
          title="Login"
          action="/api/v1/auth/login"
          buttonText="Login"
          bottomText="Don't have an account?"
          bottomLinkText="Register Here"
          bottomLinkHref="/register"
          />
        </main>
      <Footer />
    </div>
  )
}

export default LoginPage;
