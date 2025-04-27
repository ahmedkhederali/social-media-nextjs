import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import {auth} from "@/auth"
import Profile from "@/Components/Profile";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <form action={actions.signInWithGitHub}>
        <Button type="submit">Sign IN</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>


      {
        session?.user ? (
          <div>
            <h1>Welcome {JSON.stringify(session.user.name)}</h1>
            {/* <p>{session.user.email}</p> */}
          </div>
        ) : (
          <h1>Please sign in</h1>
        )
      }

      <Profile/>
    </div>
  );
}
