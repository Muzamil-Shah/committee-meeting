
type Props = {
  title: string;
  description: string;
  children: JSX.Element;
};

function BrowserHeader({ title, description, children }: Props) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-2 justify-between items-start md;items-center  py-2">
      <div className="w-full md:w-6/12 flex justify-between items-center">
        <div className="pl-11 sm:pl-0 flex flex-col justify-start items-start">
          <h3 className="line-clamp-1 font-bold text-sm md:text-xl">{title}</h3>
          <p className="line-clamp-1 text-xs md:text-sm text-muted-foreground">
            {description ?? "descriptions"}
          </p>
        </div>
        <div className="flex md:hidden self-end ">
          {/* <ModeToggle /> */}
        </div>
      </div>
      <div className="w-full flex justify-end items-center gap-2">
        {children}
      </div>
    </div>
  );
}

export default BrowserHeader;
