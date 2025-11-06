import React from "react";

/**
 * NYC Skyline decoration for the Why Bridge section
 * Static decorative element with gradient fade
 */
const NYCSkylineDecoration = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {/* Static NYC Skyline */}
        <div
          ref={ref}
          className="absolute left-[8%] md:left-[12%] bottom-[100px] md:bottom-[120px] w-[42vw] max-w-[560px] min-w-[260px]"
        >
          <img
            src="/images/Skyline.png"
            alt=""
            className="w-full h-auto select-none opacity-60 [mask-image:linear-gradient(to_bottom,black_0%,black_25%,transparent_100%)]"
            draggable="false"
          />
        </div>
      </div>
    );
  }
);

NYCSkylineDecoration.displayName = "NYCSkylineDecoration";

export default NYCSkylineDecoration;
