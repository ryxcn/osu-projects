# install flask cx_Oracle

from flask import Flask, request, jsonify
import cx_Oracle

app = Flask(__name__)

# Database connection details
db_username = 'your_username'
db_password = 'your_password'
db_host = 'your_database_host'
db_port = 'your_database_port'
db_service = 'your_database_service_name'

# Database connection string
db_connection_string = cx_Oracle.makedsn(db_host, db_port, service_name=db_service)

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.json  # Assuming JSON data sent from Arduino
    # Insert data into Oracle database
    try:
        connection = cx_Oracle.connect(db_username, db_password, db_connection_string)
        cursor = connection.cursor()
        cursor.execute("INSERT INTO your_table (column1, column2) VALUES (:1, :2)", (data['value1'], data['value2']))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'message': 'Data inserted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)