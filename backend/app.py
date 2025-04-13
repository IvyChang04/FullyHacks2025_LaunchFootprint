from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort


app = Flask(__name__)
api = Api(app)


class Launch(Resource):
    def get(self):
        # return launch_data, 200
        pass

class LaunchList(Resource):
    def get(self):
        # return launchList, 200
        pass


# Routes
api.add_resource(LaunchList, "/launches")
api.add_resource(Launch, "/launches/<int:launch_id>")

if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port="6969")
