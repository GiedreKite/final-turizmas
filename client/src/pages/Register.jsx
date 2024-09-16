import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function Register() {
    return ( 
        <>
            <Header />
            <main className="form-signin w-100 m-auto">
  <form className="col-12 col-md-8 offset-md-2 col-lg-3 offset-lg-2 col-xl-4 offset-xl-2">
    <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div>

    <div className="form-check text-start my-3">
      <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label className="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
  </form>
</main>
            <Footer />
        </>
    );
}