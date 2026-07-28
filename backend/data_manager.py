import json
from pathlib import Path


class DataManager:
    """Gestisce l'accesso ai dati di StatsBomb Open Data."""

    def __init__(self):
        self.base_path = Path(__file__).resolve().parent.parent / "data" / "statsbomb"

    def get_competitions(self) -> list[dict]:
        """Restituisce tutte le competizioni disponibili."""
        competitions_file = self.base_path / "competitions.json"

        with competitions_file.open("r", encoding="utf-8") as file:
            return json.load(file)