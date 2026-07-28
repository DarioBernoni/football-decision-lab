from data_manager import DataManager


def main():
    data_manager = DataManager()

    competitions = data_manager.get_competitions()

    print(f"\nCompetizioni trovate: {len(competitions)}\n")

    for competition in competitions:
        print(
            f"{competition['competition_name']} | "
            f"{competition['season_name']} | "
            f"{competition['country_name']}"
        )


if __name__ == "__main__":
    main()