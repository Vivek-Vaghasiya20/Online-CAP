import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminGetAllFaculty } from "../../redux/action/adminAction";
import AdminHomeHelper from "../../Components/AdminHomeHelper";
import classnames from "classnames";

const AdminGetAllFaculty = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const history = useHistory();

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminGetAllFaculty({ department }));
    setIsLoading(false);
  };

  return (
    <div>
      {store.admin.isAuthenticated ? (
        <>
          <AdminHomeHelper />
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-4">
                <form form-inline noValidate onSubmit={formHandler}>
                  <div className="form-group">
                    <label htmlFor="departmentId">Department</label>
                    <select
                      onChange={(e) => setDepartment(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.department,
                      })}
                      id="departmentId"
                    >
                      <option>Select</option>
                      <option value="E.C.E">E.C.E</option>
                      <option value="C.S.E">C.S.E</option>
                      <option value="E.E.E">E.E.E</option>
                      <option value="I.T">I.T</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                    </select>
                    {error.department && (
                      <div className="invalid-feedback">{error.department}</div>
                    )}
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-1">
                      {isLoading && (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {!isLoading && (
                    <button type="submit" className="btn btn-info btn-block  ">
                      Search
                    </button>
                  )}
                </form>
              </div>
              <div className="col-md-8">
                {store.admin.allFaculty.length === 0 && (
                  <div> No faculties found </div>
                )}
                {store.admin.allFaculty.length !== 0 && (
                  <table className="table border">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Registration Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Joining Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.admin.allFaculty.map((res, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{res.registrationNumber}</td>
                          <td>{res.name}</td>
                          <td>{res.email}</td>
                          <td>{res.joiningYear}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default AdminGetAllFaculty;
