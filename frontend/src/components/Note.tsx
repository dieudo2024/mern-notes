import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete, MdOutlinePushPin, MdPushPin } from "react-icons/md";

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note: NoteModel) => void,
    onPinNoteClicked: (note: NoteModel) => void,
    className?: string,
}

const Note = ({ note, onNoteClicked, onDeleteNoteClicked, onPinNoteClicked, className }: NoteProps) => {
    const {
        title,
        text,
        pinned,
        createdAt,
        updatedAt
    } = note;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    {pinned
                        ? <MdPushPin
                            className="text-primary ms-auto"
                            title="Unpin note"
                            onClick={(e) => {
                                onPinNoteClicked(note);
                                e.stopPropagation();
                            }}
                        />
                        : <MdOutlinePushPin
                            className="text-muted ms-auto"
                            title="Pin note"
                            onClick={(e) => {
                                onPinNoteClicked(note);
                                e.stopPropagation();
                            }}
                        />
                    }
                    <MdDelete
                        className="text-muted ms-2"
                        title="Delete note"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Note;