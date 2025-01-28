import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex items-center justify-between text-white py-2 shadow-lg">
        <h1 className="text-xl font-semibold">NEXTEK TASKS</h1>

        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-white hover:bg-white"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/sign-in");
          } }
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </header>
    </>
    
  );
}
