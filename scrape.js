var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


var url = 'https://boardgamegeek.com/browse/boardgame/page/1';


var boardgames = [];

request(url, function(error, response, html){

    if(!error){

        var $ = cheerio.load(html);

        $('.collection_table tr').each(function(i, element) {
            //console.log("#########################################################################");
            var boardGame = {};
            boardGame.rank = $(element.children).eq(1).text().trim();
            boardGame.rating = $(element.children).filter('.collection_bggrating').eq(1).text().trim();
            boardGame.name = $(element.children).filter('.collection_objectname').text().trim();
            boardGame.date = $(element.children).filter('.smallerfont.dull').text().trim();
            boardGame.price = $(element.children).filter('.collection_shop').text().trim();
            var priceTd = $(element.children).filter('td.collection_shop').children().filter('.aad');

            // if(i==2) {
            //     var priceTd = $(element.children).filter('.collection_shop').text();
            // }

            if(i==2)console.log(priceTd);
            boardgames.push(boardGame);
        })
        //console.log(boardgames);
    }
})

