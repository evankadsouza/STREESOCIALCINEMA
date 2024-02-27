const connection = require('../config/db'); // Assuming you have a database configuration file
const postUserResponseController = {}

postUserResponseController.postUserResponse = async(req,res) =>
{
    try {
        const { userName, phoneNumber, cardID, questionTypeID, optionSelected, videoDataID } = req.body;
        let finalUserID = 0;

        const insertQuery = `INSERT INTO userData (userID, userName, phoneNumber, cardID, dateAndTime,createdAt,updatedAt) VALUES (null, '${userName}',${phoneNumber},'${cardID}',NOW(),NOW(),NOW())`;
        const results = await connection.query(insertQuery);
        if(results)
        {
            console.log('success')
            const selectQuery = `SELECT userID FROM userData WHERE userName = '${userName}' AND phoneNumber = ${phoneNumber} AND cardID = '${cardID}'  ORDER BY dateAndTime DESC LIMIT 1`;

            const selectResult = await connection.query(selectQuery);
            if(selectResult.length>0){
                finalUserID = selectResult[0][0].userID;


                const insertResponseQuery =`INSERT INTO userResponses (userResponseID, userID, optionSelected, videoDataID, questionTypeID,createdAt,updatedAt) VALUES (null, ${finalUserID}, '${optionSelected}', ${videoDataID},  ${questionTypeID},NOW(),NOW())`;

                const responseResult = await connection.query(insertResponseQuery);

                if(responseResult){
                    return res.status(200).send('RESPONSE 200 OK');
                }
            }
        }
    }catch(error)
    {
        console.log(error);
    }
};

module.exports = postUserResponseController;