var scrollPercent= null,timeSpent = false, landedTime = new Date(),recordArray=[];
var htmlElement = document.documentElement, 
    bodyElement = document.body,
    scrollTop = 'scrollTop',
    scrollHeight = 'scrollHeight';
var pageTitle=document.querySelector(".page-title").textContent;

document.getElementById("welcome-text").innerHTML="Welcome " + localStorage.getItem("customer_id")+"!"

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:16baaf18-3b8b-4ead-a422-231b87dd0080',
});

AWS.config.credentials.get(function(err) {
    // attach event listener
    if (err) {
        alert('Error retrieving credentials.');
        console.error(err);
        return;
    }

    // create Amazon Kinesis service object
    var kinesis = new AWS.Kinesis({
        apiVersion: '2013-12-02'
    });

    window.setTimeout(function(){
        timeSpent=true; 
        scrollPercent = Math.round((htmlElement[scrollTop]||bodyElement[scrollTop]) / ((htmlElement[scrollHeight]||bodyElement[scrollHeight]) - htmlElement.clientHeight) * 100);
        var timeDifference = Math.round((new Date().getTime()-landedTime.getTime())/1000);
        var currentRecord = {
            Data: JSON.stringify({
                page: window.location.href,
                pageTitle:pageTitle,
                scrollPercentage:scrollPercent,
                timeSpent: timeDifference,
                customerId:localStorage.getItem("customer_id")
            }),
            PartitionKey: 'partition-' + AWS.config.credentials.identityId
        };
        recordArray.push(currentRecord); 
        console.log("time difference and scroll percent",timeDifference,scrollPercent)
    }, 4000);

    document.addEventListener("scroll", function(event){
        scrollPercent = Math.round((htmlElement[scrollTop]||bodyElement[scrollTop]) / ((htmlElement[scrollHeight]||bodyElement[scrollHeight]) - htmlElement.clientHeight) * 100);
        if(scrollPercent>=50 || timeSpent== true){
            var timeDifference = Math.round((new Date().getTime()-landedTime.getTime())/1000);
            var currentRecord = {
                Data: JSON.stringify({
                    page: window.location.href,
                    pageTitle:pageTitle,
                    scrollPercentage:scrollPercent,
                    timeSpent: timeDifference,
                    customerId:localStorage.getItem("customer_id")
                }),
                PartitionKey: 'partition-' + AWS.config.credentials.identityId
            };
            recordArray.push(currentRecord); 
            console.log("time difference and scroll percent",timeDifference,scrollPercent)
        }       
    });

    // upload data to Amazon Kinesis every second if data exists
    setInterval(function() {
        if (!recordArray.length) {
            return;
        }
        // upload data to Amazon Kinesis
        kinesis.putRecords({
            Records: recordArray,
            StreamName: 'BRIDGEPersona-Data-Stream'
        }, function(err, data) {
            if (err) {
                console.error(err);
            }
            else{
                console.log(data)
            }
        });
        // clear record data
        recordArray = [];
    }, 1000);
});


