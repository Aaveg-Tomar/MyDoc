import { useState } from "react";
import Data from "./Data";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { auth, provider } from "./firebase";
import './css/app.css';


function App() {

  const [user, setUser] = useState(null);
  const signIn = () => {
    auth.signInWithPopup(provider).then(({ user }) => {
      setUser(user)
    }).catch(error => {
      alert(error.message);
    })
  }

  return (
    <>
      {
        user ? (
          <>
            <Header photoURL = {user.photoURL} />
            <div className="big">
            <div className="App">
              <Sidebar />
              <Data />
            </div>
            </div>
          </>

        ) : (
          <>
            <div className="login">
              <img className=" w-96" src="https://img.freepik.com/free-vector/illustration-share-icon_53876-5841.jpg?w=740&t=st=1690865680~exp=1690866280~hmac=1929ee057c1f62c6f81f616076277bcb940ffbbc1a81923d58a3f85b3b2fb45b" alt="Share Icon" />
              <button onClick={signIn} className="log">Login To MyDOC</button>
            </div>
          </>
        )
      }

    </>

  );
}

export default App;
