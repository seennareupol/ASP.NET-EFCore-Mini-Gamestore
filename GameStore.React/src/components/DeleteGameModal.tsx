import React from 'react';
import { GameSummary } from '../models/GameSummary';

interface DeleteGameModalProps {
  game: GameSummary;
  onDelete: (gameId: string) => void;
}

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({ game, onDelete }) => {
  const modalId = `deleteModal-${game.id}`;
  const title = `Delete ${game.name}?`;

  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDelete(game.id);
  };

  return (
    <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-bottom-0 pb-0">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-muted">
            Are you sure you want to delete this game? This action cannot be undone.
          </div>
          <div className="modal-footer border-top-0 pt-0">
            <button type="button" className="btn btn-secondary bg-transparent border-0 text-muted" data-bs-dismiss="modal">Cancel</button>
            <form onSubmit={handleDelete}>
              <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">
                Delete Game
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteGameModal;