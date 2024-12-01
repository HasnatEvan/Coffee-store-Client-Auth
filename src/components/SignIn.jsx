import { useContext, } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const SignIn = () => {
    const { signIn } = useContext(AuthContext)
    const handleSignIn = (event) => {
        event.preventDefault()

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)


        signIn(email, password)
            .then((result) => {
                console.log("Sign-in successful:", result.user);
                // update last login time
              const lastSignInTime=result?.user?.metadata?.lastSignInTime;
              const logInfo={email,lastSignInTime}
              fetch(`http://localhost:5000/users/`,{
                method:'PATCH',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(logInfo)
              })
              .then(res=>res.json())
              .then(data=>{
                console.log(data)
              })


            

            })
            .catch(error=>{
                console.log(error)
            })









    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignIn} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default SignIn;
