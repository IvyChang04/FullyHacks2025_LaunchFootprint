import csv


def extract_locations(csv_file_path):
    locations = set()  # Use a set to store unique locations

    try:
        with open(csv_file_path, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                location = row.get("Location")
                if location:
                    locations.add(location.strip())
    except FileNotFoundError:
        print(f"Error: File not found at {csv_file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

    return sorted(locations)  # Return sorted list of unique locations


if __name__ == "__main__":
    csv_file_path = "/Users/ivychang/project/FullyHacks2025_LaunchFootprint/backend/Filtered_Launches_with_Emissions.csv"
    locations = extract_locations(csv_file_path)

    print("Extracted Locations:")
    for location in locations:
        print(location)
