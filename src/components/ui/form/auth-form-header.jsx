export const AuthFormHeader = ({ title }) => {
  return (
    <div className="flex flex-col items-center text-center pb-6">
      <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shadow-md mb-4 transition-transform duration-300 hover:scale-105">
        <span className="font-headline-md text-headline-md text-on-primary font-bold leading-none select-none">
          logo
        </span>
      </div>

      <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
        {title}
      </h1>
    </div>
  );
};
