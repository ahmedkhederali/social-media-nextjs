"use client";
import { useSession } from "next-auth/react";
export default function Profile() {
    const session = useSession();
 if(session.data?.user){
    return (
        <div>
            <h1>Welcome {JSON.stringify(session.data?.user)}</h1>
            {/* <p>{session.user.email}</p> */}
        </div>
    );
 }else{
    return (
        <h1>Please sign in</h1>
    );
  }

}
