import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { signUp } from "@/api/sign-up";
import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signUpForm = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Insira um email válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const {  mutateAsync: registerUserFn } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpForm) {

    try {
      await registerUserFn({
        name: data.name,
        email: data.email,
        password: data.password
      })

      toast.success("Cadastro realizado com sucesso!"); 

      navigate(`/sign-in?email=${data.email}`);
    } catch {
      toast.error("Erro ao realizar cadastro");
    }
   
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-1/3 p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-center">Cadastro</h1>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nome
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                {...register("name")}
              />
             
            </div>
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
              Cadastrar
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
