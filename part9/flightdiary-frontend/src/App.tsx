import { useState, useEffect } from "react";

import { NonSensitiveDiaryEntry } from "./types";

import { getAllEntries } from "./services/diaryService";

import EntryList from "./components/EntryList";
import EntryForm from "./components/EntryForm";
import { NotificationGreen, NotificationRed } from "./components/Notification";

import { Divider } from "@mui/material";

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [greenMessage, setGreenMessage] = useState<string | null>(null);
  const [redMessage, setRedMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntries(data);
    });
  });

  return (
    <div>
      <NotificationGreen message={greenMessage} />
      <NotificationRed message={redMessage} />
      <h1>Flight Diary</h1>
      <Divider />
      <EntryForm
        entries={entries}
        setEntries={setEntries}
        setGreenMessage={setGreenMessage}
        setRedMessage={setRedMessage}
      />
      <Divider />
      <EntryList entries={entries} />
    </div>
  );
};

export default App;
