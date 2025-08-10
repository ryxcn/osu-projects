import express from 'express'
import cors from 'cors'
import oracledb from 'oracledb'

const app = express()
const port = 1552

app.use(cors())
app.use(express.json())

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

const dbConfig = {
  user: 'ADMIN',
  password: 'zkbu885Um7UtcFt',
  connectString: 'ged003edb9e907e_vitalsignsdatabase_high.adb.oraclecloud.com'
}

// fetch patient data
app.get('/patient/:patientID', async (req, res) => {
  const patientID = req.params.patientID
  let connection

  try {
    connection = await oracledb.getConnection(dbConfig)

    const patientResult = await connection.execute(
      `SELECT * FROM patients WHERE patientID = :patientID`,
      [patientID]
    )

    console.log("patientResult: ", patientResult)

    const vitalSignsResult = await connection.execute(
      `SELECT * FROM vital_signs WHERE patientID = :patientID ORDER BY transmitTime`,
      [patientID]
    )

    console.log("vitalSignResult: ", vitalSignsResult)

    if (patientResult.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' })
    }

    res.json({
      patient: patientResult.rows[0],
      vitalSigns: vitalSignsResult.rows
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})