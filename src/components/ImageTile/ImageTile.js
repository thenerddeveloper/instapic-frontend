import React, { useState, useEffect } from "react";
import './ImageTile.css'

const ImageTile = (props) => {
    const { item } = props
    return (
        <div className="tile">
            <span className="post-date">{(new Date(item.date_added)).toDateString()}</span>
            <h6 className="post-user bold">{item.username}</h6>
            <img src={item.image} />
            <h6 className="post-title">{item.description}</h6>

        </div>
    );
};

export default ImageTile;
