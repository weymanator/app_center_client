import React, { useState } from "react";

export default function useTask() {
    const [task, setTask] = useState("");

    function handleChangeTask({ target }) {
        let text = target.value;
        text = text.trim();
        setTask(text);
    }

    return [task, handleChangeTask];
}
