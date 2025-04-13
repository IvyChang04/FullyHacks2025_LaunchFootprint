import pandas as pd


def filter_and_clean_launches(input_csv, output_csv, year_threshold):
    """
    Reads a CSV file, filters records with 'Launch Year' greater than the given threshold,
    removes specified columns, and writes the cleaned data to a new CSV file.

    Args:
        input_csv (str): Path to the input CSV file.
        output_csv (str): Path to the output CSV file.
        year_threshold (int): The year threshold for filtering.
    """
    # Read the CSV file into a DataFrame
    df = pd.read_csv(input_csv)

    # Filter the DataFrame for records where 'Launch Year' > year_threshold
    filtered_df = df[df["Launch Year"] > year_threshold]

    # Drop the specified columns
    columns_to_drop = [
        "Launch Suborbital",
        "Rocket Price",
        "Rocket Payload to LEO",
        "Launch Year Mon",
        "USD/kg to LEO",
        "2021 Mult",
        "USD/kg to LEO CPI Adjusted",
        "Rocket Price CPI Adjusted",
        "Dum",
    ]
    cleaned_df = filtered_df.drop(columns=columns_to_drop)

    # Write the cleaned DataFrame to a new CSV file
    cleaned_df.to_csv(output_csv, index=False)


# Example usage
filter_and_clean_launches(
    input_csv="backend/Launches.csv",
    output_csv="backend/Filtered_Launches.csv",
    year_threshold=2018,
)
