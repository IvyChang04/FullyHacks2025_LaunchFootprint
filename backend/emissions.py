import pandas as pd
import json

# Load the rocket-fuel.json file
with open("rocket-fuel.json", "r") as f:
    rocket_fuel_data = json.load(f)

# Load the Filtered_Launches.csv file
launches_df = pd.read_csv("Filtered_Launches.csv")

# Create a dictionary to map rocket names to their emissions
emission_data = {}
for rocket, data in rocket_fuel_data.items():
    emission_data[rocket] = data["fuel_mass_kg"] * data["emission_factor"]


# Add a new column for emissions
def calculate_emission(rocket_name):
    return emission_data.get(
        rocket_name, None
    )  # Return None if rocket name is not found


launches_df["Emissions (kg)"] = launches_df["Rocket Name"].apply(calculate_emission)

# Save the updated CSV
launches_df.to_csv("Filtered_Launches_with_Emissions.csv", index=False)

print("Emissions column added and saved to Filtered_Launches_with_Emissions.csv")
