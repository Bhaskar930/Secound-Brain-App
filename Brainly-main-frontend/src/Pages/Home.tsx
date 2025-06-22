import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import { SignupIcon } from "../Icons/SignUpIcon";

import brain from "../assets/706f68fe-8902-4769-b4aa-3083bd70a5aa.png";
export function Home() {
  const navigate=useNavigate();
  function LoginHandler(){
    navigate('/signin')
  }
  return (
    <div>
      <div className="flex justify-end min-h-5 p-2 mt-2">
        <Button variant="primary" text="Login" startIcon={<SignupIcon/>} onClick={LoginHandler} />
      </div>
      <div className="flex justify-around  ">
        <div  className="w-1/3 text-5xl items-center mt-20">
          <h1 className="text-5xl">🧠 Your Second Brain</h1>
    <h2 className="text-3xl">Store. Organize. Access Anytime.</h2>
        </div>
        <div>
          <img src={brain} className="bg-white" width={450} height={550}  alt="" />
        </div>
      </div>
      <div className="text-2xl">
    <p>
      Welcome to <strong>Second Brain</strong> — your personal digital space where you can save,
      organize, and revisit your most important links with ease. Whether it’s a useful article, a
      favorite website, a productivity tool, or an inspiring video, this app keeps everything in one
      place. Designed to simplify your digital life, Second Brain lets you categorize and search your
      saved content effortlessly, making sure your valuable knowledge is always accessible. No more
      messy bookmarks or forgotten resources — just clean, organized knowledge at your fingertips.
    </p>
  </div>
    </div>
  );
}
