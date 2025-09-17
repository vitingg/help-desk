export function StatusService(status: boolean) {
  switch (status) {
    case true:
      return (
        <div className="bg-feedback-doneBackground text-feedback-done rounded-4xl flex items-center w-fit py-1.5 px-3 text-center">
          <p className="font-bold">Ativo</p>
        </div>
      );
    case false:
      return (
        <div className="bg-feedback-openBackground text-feedback-open rounded-4xl flex items-center w-fit py-1.5 px-3 text-center">
          <p className="font-bold">Inativo</p>
        </div>
      );
    default:
      return true;
  }
}
