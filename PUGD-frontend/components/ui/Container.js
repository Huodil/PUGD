import React from "react";
import Card from "./Card/Card";
const Container = ({ children, Title, ...props }) => {
  return (
    <div className="container" {...props}>
      <div className="row">
        <div className="col s12">
          <Card>
            <h5>{Title}</h5>{" "}
            <div className="card-content pb-0">
              <div className="row">{children}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Container;
