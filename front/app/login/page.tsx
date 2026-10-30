import LoginScreen from "./login-screen";
import OrientationGuard from "../home/orientation-guard.jsx";

export default function LoginPage() {
  return (
    <OrientationGuard>
      <LoginScreen />
    </OrientationGuard>
  );
}
