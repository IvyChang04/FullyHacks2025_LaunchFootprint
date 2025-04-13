from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse, abort
import csv
from location_lon_lat import locations



app = Flask(__name__)
api = Api(app)

class Test(Resource):
    def get(self):
        return "Test", 200

class Launch(Resource):
    def get(self):
        # return launch_data, 200
        pass

class LaunchList(Resource):
    def get(self):

        csv_file_path = 'backend/Filtered_Launches_with_Emissions.csv'

        data = []

        with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                data.append({
                    "LaunchId": int(row['LaunchId']),
                    "RocketName": row['RocketName'],
                    "Emissions": float(row['Emissions']),
                    "Longitude": float(locations[row['Location']]['Longitude']),
                    "Latitude": float(locations[row['Location']]['Latitude']),
                    "LaunchTime": row['LaunchTime'],
                    "Location": row['Location'],
                })

            print(data)

        return data, 200


# Routes
api.add_resource(Test, "/test")
api.add_resource(LaunchList, "/launches")
api.add_resource(Launch, "/launches/<int:launch_id>")

if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port="6969")
