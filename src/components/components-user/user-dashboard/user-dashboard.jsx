import { useDispatch, useSelector } from "react-redux";
import { generateId } from "../../../utils/global.util";
import "./user-dashboard.scss";

const UserDashboard = () => {
  const { todosAssigned, categories, id } = useSelector((store) => store.userState);

  const dispatch = useDispatch();

  const handleStickyNoteClick = (categorieId) => {};

  const handleTodoClick = (todoId) => {};

  const getActivesCategories = () => {
    const filteredCategorie = [];
    const activesCategories = [];
    for (let i = 0; i < todosAssigned.length; i++) {
      if (!filteredCategorie.includes(todosAssigned[i].categorie._id)) {
        filteredCategorie.push(todosAssigned[i].categorie._id);
        activesCategories.push(todosAssigned[i].categorie);
      }
    }
    return activesCategories;
  };

  // const groupTodosByCat = (cat) => {
  //   const todosGrouped = [];
  //   for (let i=0; i<todosAssigned.length; i++) {
  //     if ( todosAssigned[i].categorie.name === cat) {
  //       todosGrouped.push(todosAssigned[i])
  //     }
  //   }
  // }

  return (
    <section className="section section__user-dashboard">
      <ul className="categorie-container">
        {getActivesCategories().map((obj) => (
          <li
            className="sticky-note"
            style={{ background: obj.color }}
            key={generateId()}
            onClick={() => handleStickyNoteClick(obj._id)}
          >
            <h4 className="sticky-note__title">{obj.name}</h4>
            <ul className="sticky-note__block">
              {todosAssigned
                .filter((todo) => todo.categorie.name === obj.name)
                .map((item) => (
                  <li
                    key={generateId()}
                    onClick={() => handleTodoClick(item._id)}
                    className="sticky-note__todo"
                  >
                    <span className="sticky-note__todo--suppervisor">
                      {item.created.by !== id ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                        >
                          <path d="M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z" />
                        </svg>
                      ) : (
                        ""
                      )}
                    </span>
                    <span className="sticky-note__todo--group">
                      {item.assignedTo.length > 1 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                        >
                          <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
                        </svg>
                      ) : (
                        ""
                      )}
                    </span>
                    <span className="sticky-note__todo--title">{item.title}</span>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserDashboard;
