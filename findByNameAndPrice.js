//Adapted from example by Ben Buckman
//https://github.com/benbuckman/nodejs-ebay-api/blob/master/examples/Finding-FindItemsByKeywords.js
var ebay = require('ebay-api');

//Expose the finding function
module.exports = function(name, price) {

    //Find by name and price with results limited to two
    var parameters = {

        keywords: [name],

        paginationInput: {
            entriesPerPage: 2
        },

        itemFilter: [
            { name: 'MaxPrice', value: price }
        ],
    }

    //Send request
    ebay.xmlRequest({
            serviceName: 'Finding',
            opType: 'findItemsByKeywords',
            appId: process.env.KEY,
            params: parameters,
            parser: ebay.parseResponseJson // (default)
        },
        // Via Buckman: "gets all the items together in a merged array"
        function itemsCallback(error, itemsResponse) {
            if (error) throw error;

            var items = itemsResponse.searchResult.item;

            //return array
            var returnArray = [];
            for (var i = 0; i < items.length; i++) {
                //Create a temp object each iteration
                var tempObj = {
                        id: items[i].itemId,
                        name: items[i].title,
                        price: items[i].sellingStatus.convertedCurrentPrice.amount,
                        salePrice: 'defaultSalePrice',
                        category: items[i].primaryCategory.categoryName,
                        url: items[i].viewItemURL,
                        imageUrl: items[i].galleryURL,
                        provider: 'eBay',
                        reviews: 'defaultReviews'
                    }
                    //Add the found object to the array
                returnArray.push(tempObj);
            }
            console.log(returnArray);
            return returnArray;
        }
    );
};