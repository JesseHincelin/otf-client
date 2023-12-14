import { useSelector } from "react-redux";

const EmptyDashboard = () => {
  const { userName } = useSelector((store) => store.userState);
  return (
    <section className="emptyDashboard">
      <h3>Hello {userName} ! </h3>
      <p>Welcome to Office Task Flow ! </p>
      <p>
        You don't have any task waiting for you to complete. To start, why don't you try to create a
        categorie for future tasks ?
      </p>
      <p>
        To do so, you can click on the following button or click on "New categorie" in the nav bar.
      </p>
      <button>New Categorie</button>
      <p>
        If you already have created a new categorie, you can set a new todo by clicking ont he
        following button or on "New to-doo" in the nav bar again.
      </p>
      <button>New to-do</button>
    </section>
  );
};

export default EmptyDashboard;
