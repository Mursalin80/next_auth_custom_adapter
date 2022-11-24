import { getProviders, signIn, getCsrfToken } from 'next-auth/react';
import Image from 'next/image';
import NavbarTailwind from '../components/NavbarTailwind';

const signin = ({ csrfToken, providers }) => {
  console.log(providers);
  return (
    <div>
      <NavbarTailwind />
      <div className="container mx-auto">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="w-full max-w-md space-y-8 bg-slate-300 m-2 p-4 rounded-lg">
            <div>
              <Image
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
                width={150}
                height={125}
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              method="post"
              action="/api/auth/callback/credentials"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    htmlForgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>

            <>
              {providers.map((provider) => (
                <div key={provider.name}>
                  <button
                    onClick={() => signIn(provider.id)}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 ">
                      <Image
                        src={`/${provider.id}.svg`}
                        height={25}
                        width={25}
                        alt={provider.name}
                      />
                    </span>
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signin;

export async function getServerSideProps(context) {
  let pro = await getProviders();
  let providers = Object.values(pro).filter((pro) => pro.id !== 'credentials');

  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
      providers,
    },
  };
}
