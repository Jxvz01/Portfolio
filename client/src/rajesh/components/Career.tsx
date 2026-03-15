import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Advanced Robotics Systems</h4>
                <h5>Engineering Focus</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Designing and planning advanced robotics platforms, including high-speed rear-wheel-drive RC cars and multi-phase line-follower bot systems. Focusing on robust wiring architectures and modular upgrades.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Digital Products & Web Systems</h4>
                <h5>Full-Stack Development</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building scalable, premium digital products and platforms for local businesses. Specializing in UI/UX systems, WordPress integrations, and modern full-stack technologies like React and Express.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Content Architecture & Optimization</h4>
                <h5>UI/UX & Research</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Auditing and restructuring large-scale web content to improve clarity, hierarchy, and information retrieval. Converting clutter into structured, highly-performant digital systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
