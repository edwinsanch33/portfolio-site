import React from "react";

export const Row = ({ children }) => {
    return (
        <div className="row flex" style={{ color: "#6888DF", textAlign: "center" }}>
            {children}
        </div>
    );
};

export const Col = ({ children }) => {
    return (
        <div className="col">
            <div>{children}</div>
        </div>
    );
};
