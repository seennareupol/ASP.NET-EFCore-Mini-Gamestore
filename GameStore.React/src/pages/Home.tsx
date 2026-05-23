import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GamesClient from '../clients/GamesClient';
import { GameSummary } from '../models/GameSummary';
import DeleteGameModal from '../components/DeleteGameModal';

// Declare bootstrap property on window object
declare global {
    interface Window {
        bootstrap: any;
    }
}

const Home: React.FC = () => {
    const [games, setGames] = useState<GameSummary[]>([]);
    const [loadingErrorList, setLoadingErrorList] = useState<string[]>([]);
    const [errorList, setErrorList] = useState<string[]>([]);
    const [gameToDelete, setGameToDelete] = useState<GameSummary | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const client = new GamesClient();

    const fetchGames = async () => {
        try {
            setIsLoading(true);
            const response = await client.getGamesAsync();
            setGames(response);
            setLoadingErrorList([]);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setLoadingErrorList([error.message]);
            } else {
                setLoadingErrorList(['An unknown error occurred']);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'Game Store: SEEN NAREUPOL';
        fetchGames();
    }, []);

    useEffect(() => {
        if (gameToDelete) {
            const modalElement = document.getElementById(`deleteModal-${gameToDelete.id}`)!;
            const modal = new window.bootstrap.Modal(modalElement);

            // Listen for modal hide event to reset gameToDelete
            const handleModalHide = () => {
                setGameToDelete(null);
            };

            modalElement.addEventListener('hidden.bs.modal', handleModalHide);
            modal.show();

            // Cleanup event listener
            return () => {
                modalElement.removeEventListener('hidden.bs.modal', handleModalHide);
            };
        }
    }, [gameToDelete]);

    const handleDelete = async (gameId: string) => {
        setErrorList([]);
        try {
            const result = await client.deleteGameAsync(gameId);

            if (result.succeeded) {
                setGameToDelete(null); // Reset the modal state
                fetchGames();
            } else {
                setErrorList(result.errors);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorList([error.message]);
            } else {
                setErrorList(['An unknown error occurred']);
            }
        }
    };

    if (isLoading) {
        return <p className="mt-3"><em>Loading...</em></p>;
    }

    if (loadingErrorList.length > 0) {
        return (
            <div>
                <div className="page-header">
                    <h2>Games</h2>
                    <Link className="btn btn-primary shadow-sm" to="/editgame" role="button">
                        <i className="bi bi-plus-lg me-1"></i> New Game
                    </Link>
                </div>
                {loadingErrorList.map((error, index) => (
                    <div key={index} className="mt-3 alert alert-danger border-0">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <em>Error loading games: {error}</em>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <h2>Games</h2>
                <Link className="btn btn-primary shadow-sm" to="/editgame" role="button">
                    <i className="bi bi-plus-lg me-1"></i> New Game
                </Link>
            </div>

            {errorList.length > 0 && (
                <div className="modal-body mt-3">
                    {errorList.map((error, index) => (
                        <div key={index} className="alert alert-danger">
                            {error}
                        </div>
                    ))}
                </div>
            )}

            {games.length === 0 ? (
                <div className="mt-3 text-muted">
                    <p><em>No games found. Click "New Game" to add your first game!</em></p>
                </div>
            ) : (
                <div className="table-container shadow-lg">
                    <table className="table table-hover table-borderless mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Genre</th>
                                <th className="text-end">Price</th>
                                <th>Release Date</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game) => (
                                <tr key={game.id}>
                                    <td className="fw-semibold">{game.name}</td>
                                    <td><span className="badge-genre">{game.genre}</span></td>
                                    <td className="text-end font-monospace">${game.price.toFixed(2)}</td>
                                    <td className="text-muted">{game.releaseDate}</td>
                                    <td>
                                        <div className="d-flex justify-content-end">
                                            <Link className="btn btn-sm btn-outline-secondary me-2 border-0" to={`/editgame/${game.id}`} role="button">
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                            <button className="btn btn-sm btn-danger px-2 border-0" onClick={() => setGameToDelete(game)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {gameToDelete && (
                <DeleteGameModal game={gameToDelete} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default Home;