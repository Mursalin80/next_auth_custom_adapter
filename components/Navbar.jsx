import { useSession, signIn, signOut } from 'next-auth/react';

export default function Example() {
  const { data: session } = useSession();

  return (
    <div as="nav" className="bg-gray-800">
      {session ? (
        <div className="text-white border-lime-200 text-lg p-3 m-1">
          {session.user.email.slice(0, 3)}
          <button
            className="text-white border-lime-200 text-lg p-3 m-1"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="text-white">
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </div>
  );
}
