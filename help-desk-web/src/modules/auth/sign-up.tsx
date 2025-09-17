import { Card } from "./components/card";
import { Footer } from "./components/footer";
import { Input } from "../../shared/components/input";
import { Button } from "../../shared/components/button";
import { Form } from "../../shared/components/form";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../../shared/schemas/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import type { signUpSchemaData } from "../../shared/schemas/auth/sign-up";
import { signUp } from "./services/api-sign-up";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<signUpSchemaData>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();

  function handleGoToSignIpPage() {
    navigate("/auth/sign-in");
  }

  const usernameError = errors.username?.message;
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  async function createUser(data: any) {
    try {
      const creatingAccount = await signUp(data);
      toast.success("Usuário criado com sucesso!");
      console.log(creatingAccount.data);
      navigate("/auth/sign-in");
    } catch (error: any) {
      toast.error("Falha ao criar usuário!");
      const status = error.response?.status;
      const message = error.response?.data?.error;

      if (status === 400 && message.includes("email")) {
        setError("email", { message: "Email já existe na aplicação." });
      } else if (status === 400 && message.includes("Username")) {
        setError("username", { message });
      } else {
        alert(message || "Erro inesperado, tente novamente.");
      }
    }

    reset({
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <>
      <Card
        title="Acesse o portal"
        description="Informe seu nome, e-mail e senha"
      >
        <Form onSubmit={handleSubmit(createUser)}>
          <Input
            legend="nome"
            placeholder="Digite o nome completo"
            className="mb-4"
            type="text"
            isError={!!usernameError}
            helperText={usernameError}
            {...register("username")}
          />
          <Input
            legend="email"
            placeholder="exemplo@email.com"
            className="mb-4"
            type="email"
            isError={!!emailError}
            helperText={emailError}
            {...register("email")}
          />
          <Input
            type="password"
            legend="senha"
            placeholder="Digite sua senha"
            className="mb-2"
            isError={!!passwordError}
            helperText={passwordError}
            {...register("password")}
          />
          <Button size={"5xl"} className="font-medium mt-7">
            Cadastrar
          </Button>
        </Form>
      </Card>

      <Card title="Já tem uma conta?" description="Entre agora mesmo">
        <Footer onClick={handleGoToSignIpPage} buttonValue="Acessar conta" />
      </Card>
    </>
  );
}
