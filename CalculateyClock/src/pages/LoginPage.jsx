import Login from "../components/Login";
import GradientBackground from "../components/GradientBackground";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen">
      <div className="bg-white border-2 border-solid max-w-md p-6 rounded-lg shadow-sm">
        <GradientBackground />
        <Login />
      </div>
    </div>
  );
}
