import axios from "axios";
import Input from "@/components/input";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
    const login = useCallback(async () => {
      try {
        await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/",
        });

        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }, [email, password, router]);


  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password, login]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "S'identifier" : "S'inscrire"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  value={name}
                  onChange={(ev: any) => setName(ev.target.value)}
                  label="Nom"
                />
              )}

              <Input
                id="email"
                label="Email ou numéro de téléphone"
                type="email"
                value={email}
                onChange={(ev: any) => setEmail(ev.target.value)}
              />
              <Input
                id="password"
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(ev: any) => setPassword(ev.target.value)}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 text-white px-4 py-3 rounded-md w-full mt-10 hover:bg-red-700 transition duration-300 ease-in-out "
            >
              {variant === "login" ? "S'identifier" : "S'inscrire"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "Première visite sur Netflix  ?"
                : "Vous avez déjà un compte ?"}

              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer "
              >
                {variant === "login" ? "Inscrivez-vous." : "Connectez-vous."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
