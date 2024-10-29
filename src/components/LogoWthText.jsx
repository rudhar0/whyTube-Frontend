function LogoWthText(data) {
  return (
    <div className="  h-[92px] w-[360px] flex flex-col justify-between items-center">
      <img className="h-[38px] " alt="WHYTUBE" />
      <h1 className="h-[38px] text-3xl font-semibold font-inter">{data.text}</h1>
    </div>
  );
}

export default LogoWthText;
