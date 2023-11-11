import userPic from "../assets/user-pic.jpg";
import x from "../assets/x.svg";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";

function User() {
  return (
    <>
      <div className="header-container">
        <div className="user-group">
          <img src={userPic} alt="user-image" className="user-image" />
          <div className="username">Mohammad Malaeb</div>
          <div className="profession">Full Stack JavaScript Developer</div>
          <div className="icons-group">
            <a href="https://x.com/21malaeb?t=9EJ21K2mmDnhKGKGh1F_xw&s=09">
              <img className="icon" src={x} alt="x" />
            </a>
            <a href="https://github.com/Mo-21">
              <img className="icon" src={github} alt="github" />
            </a>
            <a href="https://linkedin.com/in/mohammad-malaeb">
              <img className="icon" src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
