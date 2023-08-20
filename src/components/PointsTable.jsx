const PointsTable = ({ total }) => {
  console.log(total);
  return (
    <div>
      <h2>PointsTable:</h2>
      <p>{total.winner}</p>
    </div>
  );
};
export default PointsTable;
