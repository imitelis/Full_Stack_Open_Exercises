import { NonSensitiveDiaryEntry } from "../types";

interface EntryListProps {
  entries: NonSensitiveDiaryEntry[];
}

const EntryList = (props: EntryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {props.entries.map((entry, index) => (
        <div key={index}>
          <b>{entry.date}</b>
          <p>
            visibility: {entry.visibility} <br />
            weather: {entry.weather}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EntryList;
