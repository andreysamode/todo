import PropTypes from "prop-types";

export default function Status ({ type, message, closeStatus }) {
  return (
    <div className="absolute right-3 select-none">
      <div className={
        "p-2 shadow-sm b-1 b-solid b-gray-300 rounded-1 [&_button]:hidden [&_button]:hover:block"+
        (type === "info" ? " bg-white" : " bg-red-200") }>
        <button className="absolute -right-2 -top-3 rounded-10 b-1 w-6 h-6 bg-white" onClick={closeStatus}>X</button>
        {message}
      </div>
    </div>
  );
}
Status.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  closeStatus: PropTypes.func
}