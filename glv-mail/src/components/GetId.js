import React from 'react';
import { useParams } from "react-router-dom";

import Thread from "../pages/MainPage/Thread/Thread";

function GetId() {
  const { id } = useParams();

  return (
    <div>
      <Thread messageId={id} />
    </div>
  );
}

export default GetId;