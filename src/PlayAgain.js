function Playagain() {
  function refreshPage() {
    window.location.reload(false);
  }
  
  return (
    <div>
      <div className="ido">
      <h3 className="playagain1">Do you want to get humiliated again?&emsp;&emsp;
      <button className="playagain2" onClick={refreshPage}>
        I do...
      </button></h3>
      </div>
    </div>
  );
}
export default Playagain;
