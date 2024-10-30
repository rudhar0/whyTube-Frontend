import { useEffect, useState } from "react";

function FormWithOneInput(data) {
  const [currentError,setCurrentError] = useState(false)
  useEffect(() => {
    if (data.EmptyError) {
      setCurrentError(true)
    }else{
      setCurrentError(false)
    }
  }, [data.EmptyError]);
  return (
    <form
      className={`${currentError? 'gap-[30px]': 'gap-[24px]'} flex flex-col justify-center items-center`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="h-[70px] w-[360px] flex flex-col justify-center items-start gap-[6px] relative">
        <label className="text-sm font-inter font-medium" htmlFor="inputdata">
          {data.labelVal}
        </label>
        <input
          placeholder={data.PlaceHolder}
          autoFocus
          className="h-[44px] w-[360px] bg-black border-white border-2 rounded-lg	"
          type="text"
          name="inputdata"
          id=""
          value={data.value}
          onChange={(e) => {
            data.setValue(e.target.value);
            data.setError(false);
          }}
        />
        {data.EmptyError ? (
          <h4 className="absolute mt-[13.5vh] text-red-700 font-sans text-xs">
            {data.errormsg}
          </h4>
        ) : (
          ""
        )}
      </div>
      <button
        className="h-[44px] w-[360px] hover:cursor-pointer hover:bg-slate-500 bg-[#AE7AFF] text-black font-semibold font-inter "
        type="submit"
        onClick={() => {
          data.onClick();
        }}
      >
        {data.buttonText}
      </button>
     
    </form>
  );
}

export default FormWithOneInput;
