const express = require ('express');
const http = require ('http')

const inputApplication = express();
const inputPort = 5000;

const checkPalindromeApplication = express();
const palindromePort = 5001;

checkPalindromeApplication.get('/:stringtocheck', async ( req, res ) => {
    let stringToPerformComputation = req.params.stringtocheck ;

    let lengthOfTheString = stringToPerformComputation.length;

    let i = 0 ;
    let j = lengthOfTheString - 1 ;

    while ( i < j ){
        if ( stringToPerformComputation[i] != stringToPerformComputation[j] ){
            return res.status(200).json({ "message": "The GIVEN STRING IS NOT PALINDROME "});
        }
        i++;
        j--;
    }

    return res.status(200).json({ "message": "The GIVEN STRING IS A PALINDROME "});
})

inputApplication.get('/checkpalindrome/:stringtocheck', async ( req, res ) => {
    let stringToBeChecked = req.params.stringtocheck;

    // Making the call to another checkpalindrome Microservice
    try {
        
        let url = `http://localhost:5001/${stringToBeChecked}`;
        
        let data = '';

        http.get(url, (resp) => {

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    JSON.parse(data);
                    res.status(201).send(data);
                });

            }).on("error", (err) => {
              console.log("Error: " + err.message);        
        });
      

    } catch (e) {
        console.log(e);
        res.status(501).json({"message": e});
    }
})

inputApplication.listen(inputPort, () => {
    console.log(`Input Application Microservice Running on PORT ${inputPort}`);
})

checkPalindromeApplication.listen(palindromePort, () => {
    console.log(`Check Palindrome Microservice Application RUNNING ON PORT ${palindromePort}`)
})