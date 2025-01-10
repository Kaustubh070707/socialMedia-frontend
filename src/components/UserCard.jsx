const UserCard = ({ user }) => {
  let photoUrl = user?.photoUrl;
  const { firstName, lastName } = user;
  if (photoUrl == "www.photo.com")
    photoUrl =
      "https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.jpg?s=612x612&w=0&k=20&c=uS4knmZ88zNA_OjNaE_JCRuq9qn3ycgtHKDKdJSnGdY=";
  const about = "This is Default about user";
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative top-[-10%] card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="User" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <div className="card-actions justify-center space-x-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
