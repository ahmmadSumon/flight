import { useForm } from "react-hook-form";
import { loginUser } from "@/services/authService";
import { useAuthStore } from "@/stores/useAuthStore";

const Login = () => {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();
  const setToken = useAuthStore((state) => state.setToken);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await loginUser(data);
      setToken(response.data.token);
      alert("Login Successful!");
    } catch (error) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <input {...register("email")} placeholder="Email" className="input" />
      <input {...register("password")} placeholder="Password" type="password" className="input" />
      <button type="submit" className="btn">Login</button>
    </form>
  );
};

export default Login;
