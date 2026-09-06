import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import * as NotesApi from "../network/notes_api";

interface DeleteNoteDialogProps {
    noteToDelete: Note,
    onDismiss: () => void,
    onDeleteSuccessful: (note: Note) => void,
}

const DeleteNoteDialog = ({ noteToDelete, onDismiss, onDeleteSuccessful }: DeleteNoteDialogProps) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const [errorText, setErrorText] = useState<string | null>(null);

    async function handleConfirm() {
        setErrorText(null);
        setIsDeleting(true);
        try {
            await NotesApi.deleteNote(noteToDelete._id);
            onDeleteSuccessful(noteToDelete);
        } catch (error) {
            console.error(error);
            setErrorText("Something went wrong while deleting the note. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete note
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                Are you sure you want to delete <strong>{noteToDelete.title}</strong>? This action cannot be undone.
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onDismiss}
                    disabled={isDeleting}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={handleConfirm}
                    disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteNoteDialog;