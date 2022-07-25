import React from "react";
function Image({ image }) {
  return (
    <div>
      <img alt='' src={image.src} style={{maxWidth: '200px'}} />
    </div>
  );
}
export default Image;