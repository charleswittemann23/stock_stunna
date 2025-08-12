export default function HomePage(){
    return (
    <div className="page-content">
      <h1 className="page-title">Welcome Home</h1>
      <div className="content-card">
        <p>This is the home page content. Welcome to my retro pixel-style portfolio!</p>
        <div className="pixel-grid">
          <div className="pixel-box color-a2c2dd">Design</div>
          <div className="pixel-box color-d8a7b1">Code</div>
          <div className="pixel-box color-bfd8bd">Create</div>
        </div>
      </div>
    </div>
  );
}