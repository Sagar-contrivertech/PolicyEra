const express = require('express')
const cors = require('cors')

const { google } = require('googleapis')

const app = express()
app.use(cors())
app.use(express.json())

//authentications
const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient();
    const sheets = google.sheets({
        version: 'v4',
        auth: client
    });
    return { sheets }
}

const id = "16jTSryxwrz7XPLs_QQF56Yy0qOx_xryawEmurSdajRw"// spreadsheet i
// writing data toaspreadsheet
app.post('/', async (req, res) => {

    try {

        const d = new Date();
        let date = d.toLocaleDateString();

        // destructure'newName'and'newValue'from req.body
        const { Name, Number, Email, Qualifications } = req.body;
        const { sheets } = await authentication();
        // writing data toaspreadsheet
        const writeReq = await sheets.spreadsheets.values.append({
            spreadsheetId: id,
            range: 'POSP',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [date, Name, Number, Email, Qualifications],
                ]
            }
        })
        if (writeReq.status === 200) {
            return res.status(200).json({ msg: 'Spreadsheet updated successfully!' })
        }
        return res.json({ msg: 'Something went wrong while updating the spreadsheet.' })
    } catch (e) {
        console.log('ERROR UPDATING THE SPREADSHEET', e);
        res.status(500).send();
    }
})

app.post('/getassured', async (req, res) => {
    try {

        const d = new Date();
        let date = d.toLocaleDateString();

        // destructure'newName'and'newValue'from req.body
        const { Gender, FirstName, LastName, Product,description } = req.body;
        const { sheets } = await authentication();
        // writing data toaspreadsheet
        const writeReq = await sheets.spreadsheets.values.append({
            spreadsheetId: id,
            range: 'assured',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [date, Gender, FirstName, LastName, Product,description],
                ]
            }
        })
        if (writeReq.status === 200) {
            return res.status(200).json({ msg: 'Spreadsheet updated successfully!' })
        }
        return res.json({ msg: 'Something went wrong while updating the spreadsheet.' })
    } catch (e) {
        console.log('ERROR UPDATING THE SPREADSHEET', e);
        res.status(500).send();
    }
})
app.listen(3000, () => console.log('server is running in 3000'))