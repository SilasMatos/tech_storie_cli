const Loader = () => {
  return (
    <div className="relative flex justify-center items-center w-16 h-16 rounded-full">
      <svg
        className="absolute flex justify-center items-center w-[86px] h-[86px]"
        viewBox="0 0 86 86"
      >
        <circle
          className="absolute fill-none stroke-[#c3c8de] stroke-[6px] rounded-full rotate-[-100deg] origin-center"
          cx="43"
          cy="43"
          r="40"
        ></circle>
        <circle
          className="absolute fill-none stroke-[#4f29f0] stroke-[6px] rounded-full rotate-[-100deg] origin-center animate-[circle-outer_1.8s_ease_infinite_0.3s]"
          cx="43"
          cy="43"
          r="40"
        ></circle>
        <circle
          className="absolute fill-none stroke-[#4f29f0] stroke-[6px] rounded-full rotate-[-100deg] origin-center animate-[circle-outer_1.8s_ease_infinite_0.15s]"
          cx="43"
          cy="43"
          r="40"
        ></circle>
      </svg>
      <svg
        className="absolute flex justify-center items-center w-[60px] h-[60px]"
        viewBox="0 0 60 60"
      >
        <circle
          className="absolute fill-none stroke-[#c3c8de] stroke-[6px] rounded-full rotate-[-100deg] origin-center"
          cx="30"
          cy="30"
          r="27"
        ></circle>
        <circle
          className="absolute fill-none stroke-[#4f29f0] stroke-[6px] rounded-full rotate-[-100deg] origin-center animate-[circle-middle_1.8s_ease_infinite_0.25s]"
          cx="30"
          cy="30"
          r="27"
        ></circle>
        <circle
          className="absolute fill-none stroke-[#4f29f0] stroke-[6px] rounded-full rotate-[-100deg] origin-center animate-[circle-middle_1.8s_ease_infinite_0.1s]"
          cx="30"
          cy="30"
          r="27"
        ></circle>
      </svg>
      <svg
        className="absolute flex justify-center items-center w-[34px] h-[34px]"
        viewBox="0 0 34 34"
      >
        <circle
          className="absolute fill-none stroke-[#c3c8de] stroke-[6px] rounded-full rotate-[-100deg] origin-center"
          cx="17"
          cy="17"
          r="14"
        ></circle>
        <circle
          className="absolute fill-none stroke-[#4f29f0] stroke-[6px] rounded-full rotate-[-100deg] origin-center animate-[circle-inner_1.8s_ease_infinite_0.2s]"
          cx="17"
          cy="17"
          r="14"
        ></circle>
        <circle
          className="absolute fill-none stroke-[#4f29f0] stroke-[6px] rounded-full rotate-[-100deg] origin-center animate-[circle-inner_1.8s_ease_infinite_0.05s]"
          cx="17"
          cy="17"
          r="14"
        ></circle>
      </svg>
      <div className="absolute -bottom-10 flex justify-center items-center lowercase font-medium text-sm tracking-wider">
        <span className="text-[#414856]">Searching</span>
        <span className="absolute left-0 text-[#4f29f0] animate-[text-animation_3.6s_ease_infinite] clip-path-inset-0-full-0-0"></span>
      </div>
    </div>
  )
}

export default Loader
