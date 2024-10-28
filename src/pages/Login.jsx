function Login() {
  return (
    <div className="mt-[90px]">
      <div className="bg-black flex flex-col justify-center items-center h-[262px] w-[360px] text-white gap-[32px]">
        <div className="  h-[92px] w-[360px] flex flex-col justify-between items-center">
          <img className="h-[38px] " alt="WHYTUBE" />
          <h1 className="h-[38px] text-3xl font-semibold font-inter">Welcome Back!</h1>
        </div>
        <form className="gap-[24px] flex flex-col justify-center items-center">
          <div className="h-[70px] w-[360px] flex flex-col justify-center items-start gap-[6px]">
            <label className="text-sm font-inter font-medium" htmlFor="inputdata">Email or usernsme*</label>
            <input autoFocus className="h-[44px] w-[360px] bg-black border-white border-2 rounded-lg	" type="text" name="inputdata" id="" />
          </div>
          <button className="h-[44px] w-[360px] hover:cursor-pointer hover:bg-slate-500 bg-[#AE7AFF] text-black font-semibold font-inter " type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
