import RegisterForm from "../components/Register";
import GradientBackground from "../components/GradientBackground";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen">
      <div className="bg-white border-2 border-solid max-w-md p-6 rounded-lg shadow-sm">
        <GradientBackground />
        <RegisterForm />
      </div>
    </div>
  );
}
