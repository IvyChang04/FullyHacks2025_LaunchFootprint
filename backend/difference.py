import pandas as pd
import json


def find_missing_rockets(filtered_csv, fuel_json):
    """
    Finds rocket names in the filtered CSV that are not present in the rocket fuel JSON.

    Args:
        filtered_csv (str): Path to the filtered CSV file.
        fuel_json (str): Path to the rocket fuel JSON file.

    Returns:
        list: A list of rocket names missing in the JSON file.
    """
    # Load the filtered CSV
    df = pd.read_csv(filtered_csv)

    # Load the rocket fuel JSON
    with open(fuel_json, "r") as file:
        rocket_fuel_data = json.load(file)

    # Get the unique rocket names from the CSV
    rocket_names_csv = set(df["Rocket Name"].unique())

    # Get the rocket names from the JSON
    rocket_names_json = set(rocket_fuel_data.keys())

    # Find the missing rocket names
    missing_rockets = rocket_names_csv - rocket_names_json

    return list(missing_rockets)


# Example usage
missing_rockets = find_missing_rockets(
    filtered_csv="backend/Filtered_Launches.csv", fuel_json="backend/rocket-fuel.json"
)

print("Rocket names missing in rocket-fuel.json:", missing_rockets)
