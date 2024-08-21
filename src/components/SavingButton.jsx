const SavingButton = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="icon-group">
          <img src="/sync.png" alt="saved-icon" width={20} height={20} />
          <p>Saving</p>
        </div>
      ) : (
        <div className="icon-group">
          <img src="/check.png" alt="saved-icon" width={20} height={20} />
          <p>Saved</p>
        </div>
      )}
    </>
  );
};

export default SavingButton;
