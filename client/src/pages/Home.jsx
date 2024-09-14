import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { HomeHero } from "../components/hero/HomeHero";


export function Home() {
    return (
        <><h1>Turinys:</h1>
            <Header />
            <HomeHero />
            <Footer />
        </>
    );
}