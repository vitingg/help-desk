import vectorLogo from "../../../shared/assets/vectors/Logo_IconDark.svg"

export function Icon(){
  return (
    <div className="flex gap-2 items-center justify-center mt-12 mb-8">
      <img src={vectorLogo} height={"40"} width={"40"} alt="" />
      <h1 className="text-xl text-blue-dark font-semibold">HelpDesk</h1>
    </div>
  )
}