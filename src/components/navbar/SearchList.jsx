import { Link } from "react-router-dom";
import "./SearchList.css";

const SearchList = (props) => {
  return (
    <div>
      {props.loading ? (
        <div>Loading</div>
      ) : props.details.length !== 0 ? (
        <ul className="search-list list-group w-100">
          {props.details.map((detail, idx) => {
            return (
              <Link key={idx} to={`/eventdetails/${detail._id}`}>
                <li className="list-group-item list-group-item-action">
                  {detail.eventName}
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <ul className="search-list list-group w-100">
          <li className="list-group-item list-group-item-action" key={1}>
            No Event found
          </li>
        </ul>
      )}
    </div>
  );
};
export default SearchList;
