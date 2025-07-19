import ROUTES from "@/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTES.SIGN_IN); // or ROUTES.SIGN_IN if imported
}
