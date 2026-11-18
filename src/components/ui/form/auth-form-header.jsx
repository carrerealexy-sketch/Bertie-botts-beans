export const AuthFormHeader = ({ title }) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center pb-6">
      <img
        src="https://ih1.redbubble.net/image.2091716728.5254/st,small,845x845-pad,1000x1000,f8f8f8.jpg"
        alt="Logo Bertie Bott"
        className="w-full max-w-[175px] rounded-full"
      />

      <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
        {title}
      </h1>
    </div>
  );
};
