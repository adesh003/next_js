export default function UserProfile({ params }: { params: { id: string } }) {


    return (
      <div>
        <h1>Profile</h1>
        <hr />
        <p className="text-white-300 text-3xl">
          Profile page
          <span className="text-orange-500"> {params.id} </span>
        </p>
      </div>
    );
  }
  