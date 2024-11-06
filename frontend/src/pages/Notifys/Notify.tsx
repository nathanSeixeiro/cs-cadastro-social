import NotifyListIcon from '@/assets/notify-list-icon.svg'
const Notify = () => {
  return (
    <>
      <div className="h-dvh overflow-auto w-full pl-[80px] pt-[3%] pr-[3%] flex flex-col justify-items-end text-end">
        <h1 className="font-bold text-3xl mb-2">Notificações</h1>
        <div className="flex flex-col p-2 gap-3">
          <article className="border-[1px] border-gray-400/50 border-solid rounded-3xl p-4 text-start">
            <div className="flex items-center justify-between gap-4">
              <img 
               src={NotifyListIcon}
              />
              <div className="text-sm text-gray-800 flex flex-col w-full">
                <span className="font-bold text-gray-800 text-md">
                Reunião - dia 18/12
                </span>
                <p className='text-sm line-clamp-2'>
                Reunião sobre o próximo mutirão semestral 
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default Notify;
