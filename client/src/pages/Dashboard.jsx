
import { useContext } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";

export function Dashboard() {
    const { isLogedIn } = useContext(GlobalContext);

    return (
        <>
            <Header />
            {
                isLogedIn &&
                <main>
                    <h1>Dashboard</h1>
                    <p>sita puslapi mato tik prisijunge vartotojai</p>
                </main>
            }
            {
                !isLogedIn &&
                <main>
                    <h1>401</h1>
                    <p>sitas puslapis mato tik prisijungusiems vartotojams, eik i LOGIN psl</p>
                </main>
            }
            <Footer />
        </>
    );
}