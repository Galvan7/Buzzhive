import React from "react";
import "./EmptyChatRoom.css";

function EmptyChatRoom() {
  return (
    <div>
      <div className="EmptyChatroom">
        <img className="emptychatroom-img" src="assets/home.png" alt=""></img>
        <p className="empty-chatroom-mainhead">Connect to Your Hive Now!</p>
        <p className="empty-chatroom-subhead">
          Select a User from the Sidebar and Start conversation or Add a User
          using username from the option in the top right corner of the page.
        </p>
      </div>
    </div>
  );
}

export default EmptyChatRoom;
