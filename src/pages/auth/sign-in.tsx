import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signInForm = z.object({
  email: z.string().email("Insira um email válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const [searchParams] = useSearchParams(); 

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>(
    {
      defaultValues: {
        email: searchParams.get("email") ?? "",
      },
    }
  );

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({
        email: data.email,
        password: data.password
      });

      toast.success("Login realizado com sucesso!"); 

      navigate("/");
    } catch {
      toast.error("Credenciais inválidas.");
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-1/3 p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                {...register("email")}
              />
             
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                {...register("password")}
              />
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full mt-4">
              Acessar
            </Button>
          </form>

        </CardContent>
          <Link to="/sign-up">
            <p className="text-center mt-4 hover:underline">Criar conta</p>
          </Link>
      </Card>
    </div>
  );
}
